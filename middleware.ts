import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const locale = url.locale // Получаем текущую локаль из Next.js i18n

  // Маршруты, которые нужно переписать в польской версии (pl)
  const rewritesPL: Record<string, string> = {
    '/czlonek/': '/clanek/',
    '/festiwale': '/festivaly',
    '/rejestracja': '/registrace',
    '/fanshop': '/obchod',
    '/galeria-zdjec': '/fotogalerie',
    '/partnerzy': '/partneri',
    '/kontakty': '/kontakt',
    '/zwyciezcy': '/vyherci',
  }

  // Чешские маршруты, которые должны отдавать 404 на польской версии
  const forbiddenPL = [
    '/clanek/',
    '/festivaly',
    '/vyherci',
    '/registrace',
    '/obchod',
    '/fotogalerie',
    '/partneri',
    '/kontakt',
  ]

  // Если польская версия (pl), проверяем, надо ли переписать маршрут
  if (locale === 'pl') {
    for (const [source, destination] of Object.entries(rewritesPL)) {
      if (url.pathname.startsWith(source)) {
        url.pathname = url.pathname.replace(source, destination)
        return NextResponse.rewrite(url)
      }
    }

    // Если пользователь зашел на запрещенный маршрут → 404
    if (forbiddenPL.some((route) => url.pathname.startsWith(route))) {
      return NextResponse.rewrite(new URL('/404', req.url))
    }
  }

  return NextResponse.next() // Оставляем остальные запросы как есть
}

// Middleware работает на этих маршрутах
export const config = {
  matcher: [
    '/czlonek/:path*',
    '/clanek/:path*',
    '/festiwale',
    '/festivaly',
    '/rejestracja',
    '/registrace',
    '/fanshop',
    '/obchod',
    '/vyherci',
    '/zwyciezcy',
    '/galeria-zdjec',
    '/fotogalerie',
    '/partnerzy',
    '/partneri',
    '/kontakty',
    '/kontakt',
  ],
}
