import nodemailer from "nodemailer";
import { resetMailTemplate } from "./resetTemplate";

const sendEmail = async (options: any) => {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        }
      });

      let html = resetMailTemplate(options.template,options.value);
      // send mail with defined transport object
      const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: html,
      };
      const info = await transport.sendMail(message);
  
      console.log("Message sent: %s", info.messageId);
};
export{sendEmail}