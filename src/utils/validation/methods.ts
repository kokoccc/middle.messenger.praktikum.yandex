import { isEqual } from 'helpers';

interface FieldToggler {
  inputEl: HTMLInputElement
  parentClassName?: string
  errorMessages: string[]
  isValid: boolean
}

const toggleField = ({
  inputEl,
  parentClassName = 'ui-text-field',
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

const validateField = (el: HTMLElement, {
  rules,
  parentClassName = 'ui-text-field',
}: ValidationProps): boolean => {
  const inputEl = (el.matches('input') ? el : el.querySelector('input')) as HTMLInputElement;
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

  return isValid;
};

const validateForm = (form: Form): boolean => {
  let isFormValid = true;

  form.fields.forEach((field) => {
    const isFieldValid = field.validate();

    if (!isFieldValid) {
      isFormValid = false;
    }
  });

  return isFormValid;
};

const validateValueMatching = (el: HTMLInputElement, fieldName: string) => {
  const inputEl = (el.matches('input') ? el : el.querySelector('input')) as HTMLInputElement;
  const { value } = inputEl;

  const formEl = el.closest('form');
  const originalInputEl = formEl?.querySelector(`input[name="${fieldName}"]`) as HTMLInputElement;
  const originalValue = originalInputEl?.value;

  const isValid = isEqual(value, originalValue);

  toggleField({
    inputEl,
    errorMessages: ['Пароли не соответствуют друг другу'],
    isValid,
  });

  return isValid;
};

export { validateField, validateForm, validateValueMatching };
