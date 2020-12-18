import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const settingsMail = {
   host: process.env.HOST_MAIL,
   port: process.env.PORT_MAIL,
   secure: process.env.SECURE_MAIL,
   auth: {
      user: process.env.AUTH_USER_MAIL,
      password: process.env.AUTH_PASSWORD_MAIL,
   }

} as SMTPTransport.Options;

const transporter = nodemailer.createTransport(settingsMail);

export default transporter;