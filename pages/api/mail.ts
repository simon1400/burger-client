import type { NextApiRequest, NextApiResponse } from "next";

import {orderMail} from '../../mail-templates/order';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_TOKEN || '',
});

const sentFrom = new Sender("info@desua.cz", "Burger");

// const APP_API = process.env.APP_API;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST') {
    console.log('POST /SEND ORDER');

    const data = req.body

    try{
      const recipients = [
        new Recipient(data.shiping.email, "Recipient"),
      ];
  
      const emailParams = new EmailParams()
          .setFrom(sentFrom)
          .setReplyTo(sentFrom)
          .setTo(recipients)
          .setSubject('Order №: ' + data.idOrder)
          .setHtml(orderMail(data))
          .setText("New order");
  
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