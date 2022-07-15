import { Block } from 'utils';
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
    validate: true,
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
    validate: true,
  }),
  inputSecondName: new TextField({
    label: 'Фамилия',
    name: 'second_name',
    placeholder: 'Пупкин',
    type: 'text',
    validate: true,
  }),
  inputPhone: new TextField({
    inputmode: 'tel',
    label: 'Телефон',
    name: 'phone',
    placeholder: '+79031112233',
    type: 'tel',
    validate: true,
  }),
  inputEmail: new TextField({
    inputmode: 'email',
    label: 'E-mail',
    name: 'email',
    placeholder: 'vasya@mail.ru',
    type: 'email',
    validate: true,
  }),
  inputPassword: new TextField({
    label: 'Пароль',
    name: 'password',
    placeholder: '••••••••',
    type: 'password',
    validate: true,
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
    super({ ...getElements(), form: 'form--signup' });
  }

  render() {
    return this.compile(template, this.props);
  }
}
