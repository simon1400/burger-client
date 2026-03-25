import type { NextApiRequest, NextApiResponse } from 'next'

import { Resend } from 'resend'

import { orderMail } from '../../mail-templates/form'
import { orderMailPl } from '../../mail-templates/formPl'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body

    const email = data.data.filter((item: any) => item.key === 'E-mail')[0].value
    const locale = data.locale

    try {
      const bcc =
        locale === 'en'
          ? ['supkova@bedy.cz', 'vladek@bedy.cz', 'info@burgerfestival.cz']
          : [
              'info@burgerfestival.pl',
              'vladek@bedy.cz',
              'supkova@bedy.cz',
              'snasel@bedy.cz',
              'oscar@bedy.cz',
              'grega@bedy.cz',
              'j.roosinska@gmail.com',
            ]

      await resend.emails.send({
        from: 'Burger street festival <noreply@burgerfestival.cz>',
        to: [email],
        bcc,
        subject: 'Registration from web',
        html: locale === 'en' ? orderMail(data.data) : orderMailPl(data.data),
      })

      res.status(200).send('Email sent')
    } catch (err: any) {
      console.error('ERRORRR --- ', err)
      if (err.response?.body) {
        res.status(err.code).json(err.response?.body)
      } else {
        res.status(err.code).json(err.response)
      }
    }
  } else {
    res.status(200).json({ name: 'good' })
  }
}
