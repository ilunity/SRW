import { MailOptions } from 'nodemailer/lib/smtp-transport';

const sender = process.env.SMTP_USER;

type IGetMailOptions = {
  email: string;
  htmlMessage: string;
};

export const getMailOptions = (mailOptions: IGetMailOptions): MailOptions => {
  const { email, htmlMessage } = mailOptions;

  return {
    from: `"Food Recipes 🥦" ${sender}`,
    html: htmlMessage,
    subject: 'Invitation',
    to: email,
  };
};
