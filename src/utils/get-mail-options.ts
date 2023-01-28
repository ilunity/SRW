import { MailOptions } from 'nodemailer/lib/smtp-transport';

const client_host = process.env.CLIENT_HOST;

interface ITemplateOptions {
  username: string;
  token: string;
}

const getEmailTemplate = ({ username, token }: ITemplateOptions) => `
  <p><b>Hi ${username}</b></p>
  <p>Click the link to login to the FoodRecipes: ${client_host + 'auth/' + token}</p>
`;

type IGetMailOptions = ITemplateOptions & {
  email: string;
};

export const getMailOptions = (mailOptions: IGetMailOptions): MailOptions => {
  const { email, ...templateOptions } = mailOptions;

  return {
    from: '"Food Recipes 🥦" <cleanbook2@gmail.com>',
    html: getEmailTemplate(templateOptions),
    subject: 'Invitation',
    to: email,
  };
};
