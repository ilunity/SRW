import { MailOptions } from 'nodemailer/lib/smtp-transport';

type IGetMailOptions = {
  email: string;
  htmlMessage: string;
};

export const getMailOptions = (mailOptions: IGetMailOptions): MailOptions => {
  const { email, htmlMessage } = mailOptions;

  return {
    from: '"Food Recipes 🥦" <cleanbook2@gmail.com>',
    html: htmlMessage,
    subject: 'Invitation',
    to: email,
  };
};
