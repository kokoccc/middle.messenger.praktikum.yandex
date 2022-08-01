const submitForm = (
  formEl: HTMLFormElement,
  handler: (params: ControllerMethodParams) => void,
  button: Block,
): void => {
  const data = Object.fromEntries([...new FormData(formEl)]);

  handler({ data, button, formEl });
};

export { submitForm };
