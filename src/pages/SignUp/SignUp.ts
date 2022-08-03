import { Block, globalValidationRules } from 'utils';
import { authController } from 'controllers';
import {
  Button, Form, Tabs, TextField,
} from 'components';

import template from './SignUp.hbs';
import './SignUp.pcss';

export class PageSignUp extends Block {
  constructor(props: IProps = {}) {
    super({
      ...props,
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
            label: 'Имя в чате',
            name: 'display_name',
            placeholder: 'Vasya',
            type: 'text',
          }),
          new TextField({
            label: 'Имя',
            name: 'first_name',
            placeholder: 'Василий',
            type: 'text',
            validations: globalValidationRules.name,
          }),
          new TextField({
            label: 'Фамилия',
            name: 'second_name',
            placeholder: 'Пупкин',
            type: 'text',
            validations: globalValidationRules.name,
          }),
          new TextField({
            inputmode: 'tel',
            label: 'Телефон',
            name: 'phone',
            placeholder: '+79031112233',
            type: 'tel',
            validations: globalValidationRules.phone,
          }),
          new TextField({
            inputmode: 'email',
            label: 'E-mail',
            name: 'email',
            placeholder: 'vasya@mail.ru',
            type: 'email',
            validations: globalValidationRules.email,
          }),
          new TextField({
            label: 'Пароль',
            name: 'password',
            placeholder: '••••••••',
            type: 'password',
            validations: globalValidationRules.password,
          }),
          new TextField({
            label: 'Пароль (еще раз)',
            name: 'password_confirm',
            placeholder: '••••••••',
            type: 'password',
            validations: [
              ...globalValidationRules.password,
              {
                compareFieldName: 'password',
                message: 'Пароли не соответствуют друг другу',
              },
            ],
          }),
        ],
        button: new Button({
          text: 'Зарегистрироваться',
          class: 'mt-1 align-self-center',
        }),
        submit(formData: TFormData) {
          authController.signUp({
            data: formData,
            button: this.button,
          });
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
