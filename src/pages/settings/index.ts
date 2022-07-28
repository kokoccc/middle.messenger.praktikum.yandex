import { Block, globalValidationRules } from 'utils';
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
    path: '/messenger',
  }),
  inputLogin: new TextField({
    label: 'Логин',
    name: 'login',
    type: 'text',
    value: 'vasyapupkin',
    validation: {
      rules: globalValidationRules.login,
    },
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
    validation: {
      rules: globalValidationRules.name,
    },
  }),
  inputSecondName: new TextField({
    label: 'Фамилия',
    name: 'second_name',
    type: 'text',
    value: 'Пупкин',
    validation: {
      rules: globalValidationRules.name,
    },
  }),
  inputPhone: new TextField({
    inputmode: 'tel',
    label: 'Телефон',
    name: 'phone',
    type: 'tel',
    value: '+79031112233',
    validation: {
      rules: globalValidationRules.phone,
    },
  }),
  inputEmail: new TextField({
    inputmode: 'email',
    label: 'E-mail',
    name: 'email',
    type: 'email',
    value: 'vasya@mail.ru',
    validation: {
      rules: globalValidationRules.email,
    },
  }),
  button: new Button({
    text: 'Сохранить',
    class: 'mt-1 align-self-center',
  }),
});

export class PageSettings extends Block {
  constructor() {
    super({ ...getElements(), formSelector: '.form--settings' });
  }

  render() {
    return this.compile(template, this.props);
  }
}
