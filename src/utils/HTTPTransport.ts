const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type obj = Record<string, unknown>;
type arr = Array<unknown>;
type data = Record<string, number | string | obj | arr>

interface Options {
  data?: data
  headers?: Record<string, unknown>
  method: string,
  timeout?: number
}

function queryStringify(data: data) {
  const params = Object.keys(data).reduce((arr: arr, key) => {
    const result = `${key}=${data[key].toString()}` as string;
    arr.push(result);
    return arr;
  }, []).join('&');

  return params.length > 0 ? `?${params}` : params;
}

export class HTTPTransport {
  get(url: string, options: Options) {
    const { data } = options;
    let requestURL: string = url;

    if (data) {
      requestURL = url + queryStringify(data);
    }

    return this._request(requestURL, { ...options, method: METHODS.GET }, options.timeout);
  }

  post(url: string, options: Options) {
    return this._request(url, { ...options, method: METHODS.POST }, options.timeout);
  }

  put(url: string, options: Options) {
    return this._request(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  delete(url: string, options: Options) {
    return this._request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  protected _request = (url: string, options: Options, timeout = 5000) => {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = () => resolve(xhr);

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.timeout = timeout;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
