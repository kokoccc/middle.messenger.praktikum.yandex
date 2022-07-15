import './styles.pcss';
import { Block } from 'utils';

const template = `
<nav class="tabs flex flex-wrap justify-center gap-4 text-title-3">
{{#if isLogin}}
  <span class="tab tab--current">Вход</span>
  <a class="tab tab--link blue-dark" href="/signup">Регистрация</a>
{{else}}
  <a class="tab tab--link blue-dark" href="/login">Вход</a>
  <span class="tab tab--current">Регистрация</span>
{{/if}}
</nav>`;

interface props {
  isLogin: boolean
}

export class Tabs extends Block {
  constructor(props: props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
