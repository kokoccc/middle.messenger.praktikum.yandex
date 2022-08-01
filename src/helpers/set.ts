import { isPlainObject } from 'helpers';

type Indexed<T = unknown> = {
  [key in string]: T;
};

export const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (!isPlainObject(object)) {
    return object;
  }

  const keys = path.split('.');
  let currentObj = object as Indexed;

  keys.forEach((key, i) => {
    if (i === keys.length - 1) {
      currentObj[key] = value;
    } else {
      const obj = {};
      currentObj[key] = obj;
      currentObj = obj;
    }
  });

  return object;
};
