import './styles.pcss';
import { Block } from 'utils';
import {
  Button,
  LinkBack,
  TextField,
} from 'components';

const template = `
<main class="sheet mx-auto px-10 pt-6 pb-12 shadow-sheet">
  <header>
    {{{ linkBack }}}
    <h1 class="text-title-2 mt-3 text-center">Смена пароля</h1>
  </header>

  <form class="form form--signup flex flex-column gap-row-5 mt-8">
    {{{ inputOldPassword }}}
    {{{ inputNewPassword }}}
    {{{ inputNewPasswordConfirm }}}
    {{{ button }}}
  </form>
</main>`;

const elements = {
  linkBack: new LinkBack({
    path: '/profile',
  }),
  inputOldPassword: new TextField({
    label: 'Текущий пароль',
    name: 'oldPassword',
    value: 'password',
    type: 'password',
  }),
  inputNewPassword: new TextField({
    label: 'Новый пароль',
    name: 'newPassword',
    placeholder: '••••••••',
    type: 'password',
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
};

export class PagePassword extends Block {
  constructor() {
    super({ ...elements });
  }

  render() {
    return this.compile(template, this.props);
  }
}
