import * as nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
