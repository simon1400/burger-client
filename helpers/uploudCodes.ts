import type { AxiosError } from 'axios'

import axios from 'axios'

const APP_API = process.env.APP_API!
const CONCURRENCY = Number(process.env.UPLOAD_CONCURRENCY ?? 8) // параллельные воркеры
const MAX_RETRIES = 5
const TIMEOUT_MS = 20_000

interface UploadSummary {
  total: number
  succeeded: number
  failed: number
  durationMs: number
  errors: Array<{ code: string; status?: number; message: string }>
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

function eta(start: number, done: number, total: number) {
  if (done === 0) return '—'
  const elapsed = (Date.now() - start) / 1000
  const rate = done / elapsed // items/sec
  const remainingSec = (total - done) / rate
  const m = Math.floor(remainingSec / 60)
  const s = Math.round(remainingSec % 60)
  return `${m}m ${s}s`
}

export async function uploadCodes(codes: string[], locale = 'pl'): Promise<UploadSummary> {
  const client = axios.create({
    baseURL: APP_API,
    timeout: TIMEOUT_MS,
  })

  let succeeded = 0
  let failed = 0
  const errors: UploadSummary['errors'] = []
  let processed = 0

  const startTs = Date.now()

  let cursor = 0
  const total = codes.length

  async function postOne(code: string, attempt = 1): Promise<void> {
    try {
      await client.post(`/api/codes`, { data: { code, locale } })
      succeeded++
    } catch (e) {
      const err = e as AxiosError<any>
      const status = err.response?.status
      const retryable = status === 429 || (status && status >= 500) || err.code === 'ECONNABORTED'

      if (retryable && attempt <= MAX_RETRIES) {
        const delay = Math.min(60_000, 500 * 2 ** (attempt - 1)) // экспоненциальный бэкофф до 60с
        console.warn(
          `[retry ${attempt}/${MAX_RETRIES}] code="${code}" status=${status ?? err.code} wait=${delay}ms`,
        )
        await sleep(delay)
        return postOne(code, attempt + 1)
      }

      failed++
      errors.push({
        code,
        status,
        message: err.response?.data?.error?.message || err.message,
      })
      console.error(
        `[fail] code="${code}" status=${status} msg=${errors[errors.length - 1].message}`,
      )
    } finally {
      processed++
      // лог каждые 100, и в конце каждого процента
      if (
        processed % 100 === 0 ||
        processed === total ||
        processed % Math.max(1, Math.floor(total / 100)) === 0
      ) {
        const pct = ((processed / total) * 100).toFixed(1)
        console.log(
          `[progress] ${processed}/${total} (${pct}%)  ok=${succeeded}  fail=${failed}  ETA=${eta(startTs, processed, total)}`,
        )
      }
    }
  }

  async function worker(id: number) {
    while (true) {
      let index: number
      // атомарный захват индекса
      if (cursor >= total) return
      // eslint-disable-next-line prefer-const
      index = cursor
      cursor++

      const code = codes[index]
      if (!code) continue
      await postOne(code)
      // маленькая задержка чтобы не забить Strapi, можно убрать/поднять
      await sleep(10)
    }
  }

  console.log(`[start] Upload ${total} codes with concurrency=${CONCURRENCY}`)
  const workers = Array.from({ length: CONCURRENCY }, (_, i) => worker(i))
  await Promise.all(workers)

  const durationMs = Date.now() - startTs
  console.log(
    `[done] total=${total} ok=${succeeded} fail=${failed} time=${(durationMs / 1000).toFixed(1)}s`,
  )

  return { total, succeeded, failed, durationMs, errors }
}
