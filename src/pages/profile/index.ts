import './styles.pcss';
import { Block } from 'utils';
import {
  Avatar,
  Button,
  LinkBack,
  TextField,
} from 'components';

const template = `
<main class="sheet mx-auto px-10 pt-6 pb-12 shadow-sheet">
  <header>
    {{{ linkBack }}}
    <h1 class="text-title-2 mt-3 text-center">Ваш профиль</h1>
    {{{ avatar }}}
  </header>

  <form class="form form--signup flex flex-column gap-row-5 mt-8">
    {{{ inputLogin }}}
    {{{ inputDisplayName }}}
    {{{ inputFirstName }}}
    {{{ inputSecondName }}}
    {{{ inputPhone }}}
    {{{ inputEmail }}}
    {{{ button }}}
  </form>

  <section class="mt-6">
    <a class="text-body-medium blue-dark" href="/password">Сменить пароль</a>
    <hr class="profile__separator mt-3 bg-gray-lighter">
    <div class="mt-3 text-body-medium red">Выйти из аккаунта</div>
  </section>
</main>`;

const elements = {
  avatar: new Avatar({
    class: 'mx-auto mt-10',
  }),
  linkBack: new LinkBack({
    path: '/',
  }),
  inputLogin: new TextField({
    label: 'Логин',
    name: 'login',
    type: 'text',
    value: 'vasyapupkin',
  }),
  inputDisplayName: new TextField({
    label: 'Имя в чате',
    name: 'display_name',
    type: 'text',
    value: 'Vasya',
  }),
  inputFirstName: new TextField({
    label: 'Имя',
    name: 'first_name',
    type: 'text',
    value: 'Василий',
  }),
  inputSecondName: new TextField({
    label: 'Фамилия',
    name: 'second_name',
    type: 'text',
    value: 'Пупкин',
  }),
  inputPhone: new TextField({
    inputmode: 'tel',
    label: 'Телефон',
    name: 'phone',
    type: 'tel',
    value: '+7 (903) 111-22-33',
  }),
  inputEmail: new TextField({
    inputmode: 'email',
    label: 'E-mail',
    name: 'email',
    type: 'email',
    value: 'vasya@mail.ru',
  }),
  button: new Button({
    text: 'Сохранить',
    class: 'mt-1 align-self-center',
  }),
};

export class PageProfile extends Block {
  constructor() {
    super({ ...elements, elements });
  }

  render() {
    return this.compile(template, this.props);
  }
}
