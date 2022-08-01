import { Block, globalValidationRules, submitForm } from 'utils';
import { authController } from 'controllers';
import { Button, Tabs, TextField } from 'components';

import template from './SignUp.hbs';
import './SignUp.pcss';

const elements = {
  tabs: new Tabs({
    isLogin: false,
  }),
  inputLogin: new TextField({
    label: 'Логин',
    name: 'login',
    placeholder: 'vasyapupkin',
    type: 'text',
    validation: {
      rules: globalValidationRules.login,
    },
  }),
  inputDisplayName: new TextField({
    label: 'Имя в чате',
    name: 'display_name',
    placeholder: 'Vasya',
    type: 'text',
  }),
  inputFirstName: new TextField({
    label: 'Имя',
    name: 'first_name',
    placeholder: 'Василий',
    type: 'text',
    validation: {
      rules: globalValidationRules.name,
    },
  }),
  inputSecondName: new TextField({
    label: 'Фамилия',
    name: 'second_name',
    placeholder: 'Пупкин',
    type: 'text',
    validation: {
      rules: globalValidationRules.name,
    },
  }),
  inputPhone: new TextField({
    inputmode: 'tel',
    label: 'Телефон',
    name: 'phone',
    placeholder: '+79031112233',
    type: 'tel',
    validation: {
      rules: globalValidationRules.phone,
    },
  }),
  inputEmail: new TextField({
    inputmode: 'email',
    label: 'E-mail',
    name: 'email',
    placeholder: 'vasya@mail.ru',
    type: 'email',
    validation: {
      rules: globalValidationRules.email,
    },
  }),
  inputPassword: new TextField({
    label: 'Пароль',
    name: 'password',
    placeholder: '••••••••',
    type: 'password',
    validation: {
      rules: globalValidationRules.password,
    },
  }),
  inputPasswordConfirm: new TextField({
    label: 'Пароль (еще раз)',
    name: 'password_confirm',
    placeholder: '••••••••',
    type: 'password',
  }),
  button: new Button({
    text: 'Зарегистрироваться',
    class: 'mt-1 align-self-center',
  }),
};

export class PageSignUp extends Block {
  constructor() {
    super({
      ...elements,
      form: {
        selector: '.form--sign-up',
        fields: [
          elements.inputLogin,
          elements.inputDisplayName,
          elements.inputFirstName,
          elements.inputSecondName,
          elements.inputPhone,
          elements.inputEmail,
          elements.inputPassword,
        ],
        submit: (formEl: HTMLFormElement) => {
          submitForm(formEl, authController.signUp, elements.button);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
