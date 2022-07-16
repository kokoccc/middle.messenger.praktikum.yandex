interface FieldToggler {
  inputEl: HTMLInputElement
  parentClassName: string
  errorMessages: string[]
  isValid: boolean
}

const toggleField = ({
  inputEl,
  parentClassName,
  errorMessages,
  isValid,
}: FieldToggler) => {
  const parentEl = inputEl.closest(`.${parentClassName}`) as HTMLElement;
  const errorEl = parentEl.querySelector(`.${parentClassName}__error`);

  if (parentEl && errorEl) {
    parentEl.classList.toggle(`${parentClassName}--error`, !isValid);

    errorEl.textContent = errorMessages.join('. ');
    errorEl.classList.toggle('d-none', isValid);
  }
};

const validateInput = (event: Event, {
  rules,
  parentClassName = 'ui-text-field',
}: ValidationProps) => {
  const inputEl = event.target as HTMLInputElement;
  const { value }: { value: string } = inputEl;

  const errorMessages = rules.reduce((arr: string[], { regex, negative, message }) => {
    const isRegexTestPassed = regex.test(value);
    const isFailed = negative ? isRegexTestPassed : !isRegexTestPassed;

    return isFailed ? arr.concat(message) : arr;
  }, []);

  const isValid = errorMessages.length === 0;

  toggleField({
    inputEl,
    parentClassName,
    errorMessages,
    isValid,
  });
};

const validateForm = (event: Event) => {
  event.preventDefault();

  const formEl = event.target as HTMLFormElement;
  const formData = Object.fromEntries(new FormData(formEl));

  const inputs = formEl.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

  inputs.forEach((inputEl) => {
    inputEl.dispatchEvent(new Event('blur'));
  });

  // eslint-disable-next-line no-console
  console.log(formData);
};

export const validateOnBlur = validateInput;
export const validateOnFocus = validateInput;
export const validateOnSubmit = validateForm;
