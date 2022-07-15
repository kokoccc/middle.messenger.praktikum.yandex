import './styles.pcss';
import { Block } from 'utils';
import { Button, Tabs, TextField } from 'components';

const template = `
<main class="sheet mx-auto px-10 py-12 shadow-sheet">
  <header>{{{ tabs }}}</header>

  <form class="form form--signup flex flex-column gap-row-5 mt-8">
    {{{ inputLogin }}}
    {{{ inputDisplayName }}}
    {{{ inputFirstName }}}
    {{{ inputSecondName }}}
    {{{ inputPhone }}}
    {{{ inputEmail }}}
    {{{ inputPassword }}}
    {{{ inputPasswordConfirm }}}
    {{{ button }}}
  </form>
</main>`;

const getElements = () => ({
  tabs: new Tabs({
    isLogin: false,
  }),
  inputLogin: new TextField({
    label: 'Логин',
    name: 'login',
    placeholder: 'vasyapupkin',
    type: 'text',
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
  }),
  inputSecondName: new TextField({
    label: 'Фамилия',
    name: 'second_name',
    placeholder: 'Пупкин',
    type: 'text',
  }),
  inputPhone: new TextField({
    inputmode: 'tel',
    label: 'Телефон',
    name: 'phone',
    placeholder: '+7 (903) 111-22-33',
    type: 'tel',
  }),
  inputEmail: new TextField({
    inputmode: 'email',
    label: 'E-mail',
    name: 'email',
    placeholder: 'vasya@mail.ru',
    type: 'email',
  }),
  inputPassword: new TextField({
    label: 'Пароль',
    name: 'password',
    placeholder: '••••••••',
    type: 'password',
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
    super({ ...getElements() });
  }

  render() {
    return this.compile(template, this.props);
  }
}
