import './styles.pcss';
import { Block } from 'utils';
import { Button, Tabs, TextField } from 'components';

const template = `
<main class="sheet mx-auto px-10 py-12 shadow-sheet">
  <header>{{{ tabs }}}</header>

  <form class="form form--login flex flex-column gap-row-5 mt-8">
    {{{ inputLogin }}}
    {{{ inputPassword }}}
    {{{ button }}}
  </form>
</main>`;

const elements = {
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
};

export class PageLogin extends Block {
  constructor() {
    super({ ...elements });
  }

  render() {
    return this.compile(template, this.props);
  }
}
