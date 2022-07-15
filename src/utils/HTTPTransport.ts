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
  headers?: Record<string, unknown>
  method: string,
  timeout?: number
}

function queryStringify(data: Data) {
  const params = Object.keys(data).reduce((arr: Arr, key) => {
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
