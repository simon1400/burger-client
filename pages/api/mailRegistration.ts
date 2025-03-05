import type { NextApiRequest, NextApiResponse } from 'next'

import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend'

import { orderMail } from '../../mail-templates/form'
import { orderMailPl } from '../../mail-templates/formPl'

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_TOKEN || '',
})

const sentFrom = new Sender('noreply@burgerfestival.cz', 'Burger street festival')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body

    const email = data.data.filter((item: any) => item.key === 'E-mail')[0].value
    const locale = data.locale

    try {
      const recipients = [
        new Recipient(email, 'Recipient'),
        new Recipient('vladek@bedy.cz', 'Owner'),
      ]

      const bcc = [
        new Recipient('supkova@bedy.cz', 'Supkova'),
        new Recipient('info@burgerfestival.cz', 'Burger street festival'),
      ]

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setBcc(bcc)
        .setTo(recipients)
        .setSubject('Registration from web')
        .setHtml(locale === 'en' ? orderMail(data.data) : orderMailPl(data.data))
        .setText('New from web')

      await mailersend.email.send(emailParams)

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
