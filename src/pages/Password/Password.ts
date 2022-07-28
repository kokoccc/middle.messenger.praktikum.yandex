import { Block, globalValidationRules } from 'utils';
import {
  Button,
  LinkBack,
  TextField,
} from 'components';

import template from './Password.hbs';
import './Password.pcss';

const getElements = () => ({
  linkBack: new LinkBack({
    path: '/settings',
  }),
  inputOldPassword: new TextField({
    label: 'Текущий пароль',
    name: 'oldPassword',
    placeholder: '••••••••',
    type: 'password',
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
  }),
  button: new Button({
    text: 'Сохранить',
    class: 'mt-1 align-self-center',
  }),
});

export class PagePassword extends Block {
  constructor() {
    super({ ...getElements(), formSelector: '.form--password' });
  }

  render() {
    return this.compile(template, this.props);
  }
}
