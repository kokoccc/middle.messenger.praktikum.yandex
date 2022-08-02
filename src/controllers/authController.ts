import {
  HTTPTransport,
  router,
  snackbar,
  store,
} from 'utils';
import { ISignIn, ISignUp, ILogout } from 'interfaces';
import { ROUTES } from 'constants';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

const enum PATHS {
  getUser = '/auth/user',
  signIn = '/auth/signin',
  signUp = '/auth/signup',
  logout = '/auth/logout',
}

class AuthController {
  async getUser(showError = true) {
    return http.get(PATHS.getUser)
      .then((response) => {
        const userData = JSON.parse(response as string);

        store.set('user', {
          ...userData,
          avatar: `https://ya-praktikum.tech/api/v2/resources/${userData.avatar}`,
        });

        return true;
      })
      .catch((error) => {
        if (showError) {
          snackbar.showError(error);
        }

        store.set('user', null);
        return false;
      });
  }

  async signIn({ data, button }: ISignIn) {
    button.setLoading();

    return http.post(PATHS.signIn, { data })
      .then(async () => {
        snackbar.show('Вы успешно авторизовались');
        await this.getUser();
        router.go(ROUTES.chats);
      })
      .catch(snackbar.showError)
      .finally(button.unsetLoading);
  }

  async signUp({ data, button }: ISignUp) {
    button.setLoading();

    return http.post(PATHS.signUp, { data })
      .then(() => {
        snackbar.show('Вы успешно зарегистрировались');
        router.go(ROUTES.chats);
      })
      .catch(snackbar.showError)
      .finally(button.unsetLoading);
  }

  async logout({ button }: ILogout) {
    button.setLoading();

    return http.post(PATHS.logout)
      .then(() => {
        snackbar.show('Вы вышли из системы');
        store.set('user', null);
        router.go(ROUTES.login);
      })
      .catch(snackbar.showError)
      .finally(button.unsetLoading);
  }
}

export const authController = new AuthController();
