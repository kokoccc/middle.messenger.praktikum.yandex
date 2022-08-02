import { Block, globalValidationRules } from 'utils';
import { authController } from 'controllers';
import {
  Button, Form, Tabs, TextField,
} from 'components';

import template from './Login.hbs';
import './Login.pcss';

export class PageLogin extends Block {
  constructor(props: IProps) {
    super({
      tabs: new Tabs(),
      form: new Form({
        fields: [
          new TextField({
            label: 'Логин',
            name: 'login',
            placeholder: 'vasyapupkin',
            type: 'text',
            validations: globalValidationRules.login,
          }),
          new TextField({
            label: 'Пароль',
            name: 'password',
            placeholder: '••••••••',
            type: 'password',
            validations: globalValidationRules.password,
          }),
        ],
        button: new Button({
          class: 'mt-1 align-self-center',
          text: 'Войти',
        }),
        submit(formData: TSubmitData) {
          authController.signIn({
            data: formData,
            button: this.button,
          });
        },
      }),
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
