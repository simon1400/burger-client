import type { NextApiRequest, NextApiResponse } from 'next'

import { confirmMail } from 'mail-templates/confirm'
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend'

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_TOKEN || '',
})

interface ResponseData {
  message: string
}

export default async function POST(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { email, id } = req.body

  const sentFrom = new Sender('noreply@burgerfestival.cz', 'Burger street festival')
  const recipients = [new Recipient(email, email)]

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject('Potvrzení hlasování')
    .setHtml(confirmMail(id))

  const sendMailPromise = async () => await mailerSend.email.send(emailParams)

  try {
    await sendMailPromise()
    res.status(200).send({ message: 'All good!' })
  } catch (err: any) {
    console.log(err)
    res.status(500).json(err)
  }
}
