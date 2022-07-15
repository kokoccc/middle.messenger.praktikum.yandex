import { Block } from 'utils';
import {
  Avatar,
  Button,
  LinkBack,
  TextField,
} from 'components';

import './styles.pcss';
import template from './template.hbs';

const getElements = () => ({
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
});

export class PageProfile extends Block {
  constructor() {
    super({ ...getElements() });
  }

  render() {
    return this.compile(template, this.props);
  }
}
