import { HTTPTransport, snackbar } from 'utils';
import {
  IChangeAvatar, IChangePassword, IChangeProfile,
} from 'interfaces';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

const enum PATHS {
  avatar = '/user/profile/avatar',
  profile = '/user/profile',
  password = '/user/password',
}

class UsersController {
  async changeAvatar({ file, component }: IChangeAvatar) {
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

        component.setProps({
          imagePath: `https://ya-praktikum.tech/api/v2/resources${responseObj.avatar}`,
        });
      })
      .catch(snackbar.showError);
  }

  async changePassword({ data, button, fields }: IChangePassword) {
    button.setLoading();

    return http.put(PATHS.password, { data })
      .then(() => {
        snackbar.show('Пароль изменен');
        fields.forEach((field) => field.reset());
      })
      .catch(snackbar.showError)
      .finally(button.unsetLoading);
  }

  async changeProfile({ data, button }: IChangeProfile) {
    button.setLoading();

    return http.put(PATHS.profile, { data })
      .then(() => snackbar.show('Профиль изменен'))
      .catch(snackbar.showError)
      .finally(button.unsetLoading);
  }
}

export const usersController = new UsersController();
