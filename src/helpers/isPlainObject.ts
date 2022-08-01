export const isPlainObject = (val: unknown) => typeof val === 'object' && !Array.isArray(val) && val !== null;
