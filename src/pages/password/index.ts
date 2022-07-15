import { Block } from 'utils';
import {
  Button,
  LinkBack,
  TextField,
} from 'components';

import './styles.pcss';
import template from './template.hbs';

const getElements = () => ({
  linkBack: new LinkBack({
    path: '/profile',
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
    validate: true,
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
    super({ ...getElements(), form: 'form--password' });
  }

  render() {
    return this.compile(template, this.props);
  }
}
