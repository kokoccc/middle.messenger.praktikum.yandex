import { Block } from 'utils';
import { Button, Tabs, TextField } from 'components';

import './styles.pcss';
import template from './template.hbs';

const getElements = () => ({
  tabs: new Tabs({
    isLogin: true,
  }),
  inputLogin: new TextField({
    label: 'Логин',
    name: 'login',
    placeholder: 'vasyapupkin',
    type: 'text',
  }),
  inputPassword: new TextField({
    label: 'Пароль',
    name: 'password',
    placeholder: '••••••••',
    type: 'password',
  }),
  button: new Button({
    text: 'Войти',
    class: 'mt-1 align-self-center',
  }),
});

export class PageLogin extends Block {
  constructor() {
    super({ ...getElements() });
  }

  render() {
    return this.compile(template, this.props);
  }
}
