import type { NextApiRequest, NextApiResponse } from "next";

import {orderMail} from '../../mail-templates/form';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_TOKEN || '',
});

const sentFrom = new Sender("vladek@bedy.cz", "Burger street festival");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST') {
    console.log('POST /SEND ORDER');

    const data = req.body

    const email = data.map((item: any) => item.key === "E-mail" ? item.value : null)

    try{
      const recipients = [
        new Recipient(email, "Recipient"),
        new Recipient("vladek@bedy.cz", "Owner"),
        new Recipient("daniel.kokes@gmail.com", "Designer"),
        new Recipient("dmytro@pechunka.com", "Developer"),
      ];
  
      const emailParams = new EmailParams()
          .setFrom(sentFrom)
          .setReplyTo(sentFrom)
          .setTo(recipients)
          .setSubject('Registration form from web')
          .setHtml(orderMail(data))
          .setText("New form from web");
  
      await mailersend.email.send(emailParams);
  
      res.status(200).send('Email sent')
    } catch(err: any) {
      console.error('ERRORRR --- ', err)
      if(err.response?.body){
        res.status(err.code).json(err.response?.body);
      }else{
        res.status(err.code).json(err.response);
      }
    }
  }else{
    res.status(200).json({name: 'good'});
  }
}