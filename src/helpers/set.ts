import { isPlainObject } from 'helpers';

export const set = (
  object: TIndexed | unknown,
  path: string,
  value: unknown,
): TIndexed | unknown => {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (!isPlainObject(object)) {
    return object;
  }

  const keys = path.split('.');
  let currentObj = object as TIndexed;

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
