import { Block, globalValidationRules } from 'utils';
import { Button, Tabs, TextField } from 'components';

import template from './Login.hbs';
import './Login.pcss';

const getElements = () => ({
  tabs: new Tabs({
    isLogin: true,
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
  inputPassword: new TextField({
    label: 'Пароль',
    name: 'password',
    placeholder: '••••••••',
    type: 'password',
    validation: {
      rules: globalValidationRules.password,
    },
  }),
  button: new Button({
    text: 'Войти',
    class: 'mt-1 align-self-center',
  }),
});

export class PageLogin extends Block {
  constructor() {
    super({ ...getElements(), formSelector: '.form--login' });
  }

  render() {
    return this.compile(template, this.props);
  }
}
