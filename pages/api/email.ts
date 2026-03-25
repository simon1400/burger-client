import type { NextApiRequest, NextApiResponse } from 'next'

import { confirmMailCz } from 'mail-templates/confirm'
import { confirmMailPl } from 'mail-templates/confirmPl'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ResponseData {
  message: string
}

export default async function POST(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { email, id, locale } = req.body

  try {
    await resend.emails.send({
      from: 'Burger street festival <noreply@burgerstreetfestival.cz>',
      to: [email],
      subject: 'Potvrzení hlasování',
      html: locale === 'en' ? confirmMailCz(id) : confirmMailPl(id),
    })
    res.status(200).send({ message: 'All good!' })
  } catch (err: any) {
    console.log(err)
    res.status(500).json(err)
  }
}
