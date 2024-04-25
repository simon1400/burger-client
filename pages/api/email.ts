import { confirmMail } from 'mail-templates/confirm';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

type ResponseData = {
  message: string
}

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
  ) {
  const { email, id } = req.body;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    /* 
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: 'burgerstreetfestivalcz@gmail.com',
      pass: 'rids ebfk whok jkwp',
    },
  });

  const mailOptions: Mail.Options = {
    from: 'burgerstreetfestivalcz@gmail.com',
    to: email,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Potvrzení hlasování`,
    html: confirmMail(id)
  };

  const sendMailPromise = () => transport.sendMail(mailOptions);

  try {
    await sendMailPromise();
    res.status(200)
  } catch (err: any) {
    console.log(err)
    res.status(500).json(err)
  }
}