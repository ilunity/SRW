const client_host = process.env.CLIENT_HOST;

interface ILoginTemplate {
  token: string;
}

interface ISignUpTemplate {
  token: string;
}

class MailTemplate {
  loginTemplate = ({ token }: ILoginTemplate) => `
    <b><a href='${client_host + '/login/' + token}'>Войти в аккаунт</a></b>
  `;
  signUpTemplate = ({ token }: ISignUpTemplate) => `
    <b><a href='${client_host + '/sign-up/' + token}'>Подтвердить регистрацию</a></b>
    <p>Не переходите по ссылке, если вы не пытались зарегистрироваться.</p>
  `;
}

export const mailTemplates = new MailTemplate();
