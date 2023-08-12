const client_host = process.env.CLIENT_HOST;

interface ILoginTemplate {
  username: string;
  token: string;
}

interface ISignUpTemplate {
  token: string;
}

class MailTemplate {
  loginTemplate = ({ username, token }: ILoginTemplate) => `
    <p><b>Hi ${username}</b></p>
    <p>Click the link to log in to the FoodRecipes: ${client_host + '/auth/' + token}</p>
  `;
  signUpTemplate = ({ token }: ISignUpTemplate) => `
    <p>To submit registration follow this link: ${client_host + '/sign-up/' + token}</p>
    <p>Ignore this message if you didn't try to sign up</p>
  `;
}

export const mailTemplates = new MailTemplate();
