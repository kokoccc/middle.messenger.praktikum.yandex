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

export const globalValidationRules = {
  email: [{
    regex: /^[\w\-_]+@[a-z]+\.[a-z]+$/,
    message: 'Некорректный e-mail. Разрешенные символы: латиница, цифры, дефис, нижнее подчеркивание. Должна быть "собака" (@) и точка после неё, но перед точкой обязательно должны быть буквы. Пример: hello123@gmail.com',
  }],
  login: [
    { regex: /^.{3,20}$/, message: 'Длина логина от 3 до 20 символов' },
    { regex: /^[A-Za-z\d_-]+$/, message: 'В логине допустимы только латиница, цифры, дефис или нижнее подчеркивание' },
    { regex: /^\d+$/, message: 'Логин может содержать цифры, но не должен состоять полностью из них', negative: true },
  ],
  name: [
    { regex: /^[A-Za-zА-Яа-я-]+$/, message: 'Формат: латиница или кириллица, без пробелов и без цифр, нет спецсимволов (допустим только дефис)' },
    { regex: /^[A-ZА-Я]/, message: 'Первая буква должна быть заглавной' },
  ],
  password: [
    { regex: /^.{8,40}$/, message: 'Длина пароля 8 до 40 символов' },
    { regex: /\d/, message: 'Пароль содержать хотя бы одну цифру' },
    { regex: /[A-Z]/, message: 'Пароль должен содержать хотя бы одну заглавную букву' },
  ],
  phone: [{ regex: /^\+?\d{10,15}$/, message: 'Телефон должен состоять из 10-15 цифр, а также содержать плюс в начале' }],
};

export const validateOnBlur = validateInput;
export const validateOnFocus = validateInput;
export const validateOnSubmit = validateForm;
