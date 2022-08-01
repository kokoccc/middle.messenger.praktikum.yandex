import { HTTPTransport } from 'utils';
import BaseAPI from './BaseAPI';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

class UsersAPIClass extends BaseAPI {
  update(data = {}) {
    return http.put('/user/profile', { data });
  }
}

export const UsersAPI = new UsersAPIClass();
