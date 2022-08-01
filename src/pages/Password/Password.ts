import { Block, globalValidationRules, submitForm } from 'utils';
import { usersController } from 'controllers';
import {
  Button,
  LinkBack,
  TextField,
} from 'components';

import template from './Password.hbs';
import './Password.pcss';

const elements = {
  linkBack: new LinkBack({
    path: '/settings',
  }),
  inputOldPassword: new TextField({
    label: 'Текущий пароль',
    name: 'oldPassword',
    placeholder: '••••••••',
    type: 'password',
    validation: {
      rules: globalValidationRules.password,
    },
  }),
  inputNewPassword: new TextField({
    label: 'Новый пароль',
    name: 'newPassword',
    placeholder: '••••••••',
    type: 'password',
    validation: {
      rules: globalValidationRules.password,
    },
  }),
  inputNewPasswordConfirm: new TextField({
    label: 'Новый пароль (еще раз)',
    name: 'newPasswordConfirm',
    placeholder: '••••••••',
    type: 'password',
    validation: {
      matchingFieldName: 'newPassword',
    },
  }),
  button: new Button({
    text: 'Сохранить',
    class: 'mt-1 align-self-center',
  }),
};

export class PagePassword extends Block {
  constructor() {
    super({
      ...elements,
      form: {
        selector: '.form--password',
        fields: [
          elements.inputOldPassword,
          elements.inputNewPassword,
          elements.inputNewPasswordConfirm,
        ],
        button: elements.button,
        submit: (formEl: HTMLFormElement) => {
          submitForm(formEl, usersController.changePassword, elements.button);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
