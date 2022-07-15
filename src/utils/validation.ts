interface ValidationRule {
  regex: RegExp
  message: string
  negative?: boolean
}

type Validations = Record<string, ValidationRule[]>;

const nameValidations = [
  { regex: /^[A-Za-zА-Яа-я-]+$/, message: 'Формат: латиница или кириллица, без пробелов и без цифр, нет спецсимволов (допустим только дефис)' },
  { regex: /^[A-ZА-Я]/, message: 'Первая буква должна быть заглавной' },
];

const passwordValidations = [
  { regex: /^.{8,40}$/, message: 'Длина пароля 8 до 40 символов' },
  { regex: /\d/, message: 'Пароль содержать хотя бы одну цифру' },
  { regex: /[A-Z]/, message: 'Пароль должен содержать хотя бы одну заглавную букву' },
];

const validations: Validations = {
  email: [{
    regex: /^[\w\-_]+@[a-z]+\.[a-z]+$/,
    message: 'Некорректный e-mail. Разрешенные символы: латиница, цифры, дефис, нижнее подчеркивание. Должна быть "собака" (@) и точка после неё, но перед точкой обязательно должны быть буквы. Пример: hello123@gmail.com',
  }],
  first_name: nameValidations,
  login: [
    { regex: /^.{3,20}$/, message: 'Длина логина от 3 до 20 символов' },
    { regex: /^[A-Za-z\d_-]+$/, message: 'В логине допустимы только латиница, цифры, дефис или нижнее подчеркивание' },
    { regex: /^\d+$/, message: 'Логин может содержать цифры, но не должен состоять полностью из них', negative: true },
  ],
  message: [{ regex: /./, message: 'Введите текст сообщения' }],
  newPassword: passwordValidations,
  phone: [{ regex: /^\+?\d{10,15}$/, message: 'Телефон должен состоять из 10-15 цифр, а также содержать плюс в начале' }],
  password: passwordValidations,
  second_name: nameValidations,
};

const validate = (inputEl: HTMLInputElement) => {
  const parentEl = inputEl.closest('.ui-text-field, .message-form') as HTMLElement;
  const labelEl = parentEl.querySelector('.ui-text-field__label') as HTMLElement;
  const errorEl = parentEl.querySelector('.ui-text-field__error, .message-form__error') as HTMLElement;

  const { name, value } = inputEl;

  if (!name) {
    return;
  }

  const rules = validations[name] as unknown as ValidationRule[];

  if (!rules) {
    return;
  }

  const errors = rules.filter(({ regex, negative = false }) => {
    if (negative) {
      return regex.test(value);
    }

    return !regex.test(value);
  });

  errorEl.textContent = errors.map((error) => error.message).join('. ');

  inputEl?.classList.toggle('ui-text-field__input--error', errors.length > 0);
  labelEl?.classList.toggle('ui-text-field__label--error', errors.length > 0);
  errorEl?.classList.toggle('d-none', errors.length === 0);
};

export const onSubmit = (event: Event) => {
  event.preventDefault();

  const formEl = event.target as HTMLFormElement;
  const formData = Object.fromEntries(new FormData(formEl));

  // eslint-disable-next-line no-console
  console.log(formData);

  const inputs = formEl.querySelectorAll('input');
  inputs.forEach(validate);
};

export const onBlur = (event: Event) => {
  const inputEl = event.target as HTMLInputElement;
  validate(inputEl);
};

export const onFocus = (event: Event) => {
  const inputEl = event.target as HTMLInputElement;
  validate(inputEl);
};
