const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Obj = Record<string, unknown>;
type Arr = Array<unknown>;
type Data = Record<string, number | string | Obj | Arr>

interface Options {
  data?: Data
  headers?: Record<string, string>
  method: string,
  timeout?: number
}

function queryStringify(data: Data) {
  const params = Object.keys(data).reduce((arr: Arr, key) => {
    const result = `${key}=${data[key].toString()}`;
    arr.push(result);
    return arr;
  }, []).join('&');

  return params.length > 0 ? `?${params}` : params;
}

export class HTTPTransport {
  private _baseURL;

  constructor(baseURL: string) {
    this._baseURL = baseURL;
  }

  get(url: string, options = {}) {
    return this._request(url, { ...options, method: METHODS.GET });
  }

  post(url: string, options = {}) {
    return this._request(url, { ...options, method: METHODS.POST });
  }

  put(url: string, options = {}) {
    return this._request(url, { ...options, method: METHODS.PUT });
  }

  delete(url: string, options = {}) {
    return this._request(url, { ...options, method: METHODS.DELETE });
  }

  protected _request = (url: string, options: Options) => {
    const {
      data,
      headers = {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      method = METHODS.GET,
      timeout = 5000,
    } = options;

    const params = method === METHODS.GET && data ? queryStringify(data) : '';

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, this._baseURL + url + params);

      xhr.onload = () => {
        const { response } = xhr;

        if (xhr.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.timeout = timeout;

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.withCredentials = true;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
