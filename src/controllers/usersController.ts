import { HTTPTransport, snackbar } from 'utils';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

const enum PATHS {
  avatar = '/user/profile/avatar',
  profile = '/user/profile',
  password = '/user/password',
}

class UsersController {
  changeAvatar({ file, component }: ControllerMethodParams) {
    snackbar.show('Загружаем аватар…');

    const formData = new FormData();
    formData.append('avatar', file as File);

    return http.put(PATHS.avatar, {
      headers: {},
      data: formData,
    })
      .then((response) => {
        snackbar.show('Аватар изменен');

        const responseObj = JSON.parse(response as string);

        component?.setProps({
          imagePath: `https://ya-praktikum.tech/api/v2/resources${responseObj.avatar}`,
        });
      })
      .catch(snackbar.showError);
  }

  changePassword({ data, button, formEl }: ControllerMethodParams) {
    button?.setProps({ loading: true });

    http.put(PATHS.password, { data })
      .then(() => {
        snackbar.show('Пароль изменен');

        const passwordInputs = formEl?.querySelectorAll('input[name*="password" i]');
        passwordInputs?.forEach((inputEl) => { (inputEl as HTMLInputElement).value = ''; });
      })
      .catch(snackbar.showError)
      .finally(() => button?.setProps({ loading: false }));
  }

  changeProfile({ data, button }: ControllerMethodParams) {
    button?.setProps({ loading: true });

    http.put(PATHS.profile, { data })
      .then(() => snackbar.show('Профиль изменен'))
      .catch(snackbar.showError)
      .finally(() => button?.setProps({ loading: false }));
  }
}

export const usersController = new UsersController();
