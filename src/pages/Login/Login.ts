import { Block, globalValidationRules, submitForm } from 'utils';
import { authController } from 'controllers';
import { Button, Tabs, TextField } from 'components';

import template from './Login.hbs';
import './Login.pcss';

const elements = {
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
    class: 'mt-1 align-self-center',
    text: 'Войти',
  }),
};

export class PageLogin extends Block {
  constructor() {
    super({
      ...elements,
      form: {
        selector: '.form--login',
        fields: [
          elements.inputLogin,
          elements.inputPassword,
        ],
        submit: (formEl: HTMLFormElement) => {
          submitForm(formEl, authController.signIn, elements.button);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
