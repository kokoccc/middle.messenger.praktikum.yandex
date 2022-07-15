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
    validate: true,
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
    validate: true,
  }),
  inputSecondName: new TextField({
    label: 'Фамилия',
    name: 'second_name',
    type: 'text',
    value: 'Пупкин',
    validate: true,
  }),
  inputPhone: new TextField({
    inputmode: 'tel',
    label: 'Телефон',
    name: 'phone',
    type: 'tel',
    value: '+79031112233',
    validate: true,
  }),
  inputEmail: new TextField({
    inputmode: 'email',
    label: 'E-mail',
    name: 'email',
    type: 'email',
    value: 'vasya@mail.ru',
    validate: true,
  }),
  button: new Button({
    text: 'Сохранить',
    class: 'mt-1 align-self-center',
  }),
});

export class PageProfile extends Block {
  constructor() {
    super({ ...getElements(), form: 'form--profile' });
  }

  render() {
    return this.compile(template, this.props);
  }
}
