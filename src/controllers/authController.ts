import {
  HTTPTransport,
  router,
  snackbar,
  store,
} from 'utils';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

const enum PATHS {
  getUser = '/auth/user',
  signIn = '/auth/signin',
  signUp = '/auth/signup',
  logout = '/auth/logout',
}

class AuthController {
  checkAuth() {
    return http.get(PATHS.getUser)
      .then(() => true)
      .catch(() => false);
  }

  getUser() {
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
        snackbar.showError(error);
        store.set('user', null);

        return false;
      });
  }

  signIn({ data, button }: ControllerMethodParams) {
    button?.setProps({ loading: true });

    http.post(PATHS.signIn, { data })
      .then(() => {
        snackbar.show('Вы успешно авторизовались');
        // console.log(this.getUser);
        // this.getUser();
        router.go('/messenger');
      })
      .catch(snackbar.showError)
      .finally(() => button?.setProps({ loading: false }));
  }

  signUp({ data, button }: ControllerMethodParams) {
    button?.setProps({ loading: true });

    http.post(PATHS.signUp, { data })
      .then(() => {
        snackbar.show('Вы успешно зарегистрированы');
        router.go('/messenger');
      })
      .catch(snackbar.showError)
      .finally(() => button?.setProps({ loading: false }));
  }

  logout({ button }: ControllerMethodParams) {
    button?.setProps({ loading: true });

    http.post(PATHS.logout)
      .then(() => {
        snackbar.show('Вы вышли из системы');
        store.set('user', null);
        router.go('/login');
      })
      .catch(snackbar.showError)
      .finally(() => button?.setProps({ loading: false }));
  }
}

export const authController = new AuthController();
