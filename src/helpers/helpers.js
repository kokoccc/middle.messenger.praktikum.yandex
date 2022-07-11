const defaultValue = (value, defaultVal) => value || defaultVal;

const pageData = (pages, pageHandle, key) => {
  const page = pages.find(({ handle }) => handle === pageHandle);

  return page ? page[key] : '';
};

module.exports = {
  defaultValue,
  pageData,
};
