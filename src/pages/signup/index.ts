import { Block, globalValidationRules } from 'utils';
import { Button, Tabs, TextField } from 'components';

import './styles.pcss';
import template from './template.hbs';

const getElements = () => ({
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
    text: 'Войти',
    class: 'mt-1 align-self-center',
  }),
});

export class PageSignup extends Block {
  constructor() {
    super({ ...getElements(), formSelector: '.form--signup' });
  }

  render() {
    return this.compile(template, this.props);
  }
}
