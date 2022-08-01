import { HTTPTransport } from 'utils';
import BaseAPI from './BaseAPI';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

class AuthAPIClass extends BaseAPI {
  create(data = {}) {
    return http.post('/auth/signup', { data });
  }

  request(data = {}) {
    return http.post('/auth/signin', { data });
  }
}

export const AuthAPI = new AuthAPIClass();
