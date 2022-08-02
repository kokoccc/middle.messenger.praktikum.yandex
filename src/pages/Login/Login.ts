import { Block, globalValidationRules, submitForm } from 'utils';
import { authController } from 'controllers';
import {
  Button, Form, Tabs, TextField,
} from 'components';

import template from './Login.hbs';
import './Login.pcss';

export class PageLogin extends Block {
  constructor(props: TProps) {
    super({
      tabs: new Tabs({
        isLogin: true,
      }),
      form: new Form({
        fields: [
          new TextField({
            label: 'Логин',
            name: 'login',
            placeholder: 'vasyapupkin',
            type: 'text',
            validation: {
              rules: globalValidationRules.login,
            },
          }),
          new TextField({
            label: 'Пароль',
            name: 'password',
            placeholder: '••••••••',
            type: 'password',
            validation: {
              rules: globalValidationRules.password,
            },
          }),
        ],
        button: new Button({
          class: 'mt-1 align-self-center',
          text: 'Войти',
        }),
        events: {
          submit: (event) => {
            event.preventDefault();
            console.log('submit');
          },
        },
      }),
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
