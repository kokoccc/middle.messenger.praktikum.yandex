import './styles.pcss';
import { Block } from 'utils';

const template = `
<main class="sheet mx-auto px-10 py-6 shadow-sheet">
  <header>{{{ tabs }}}</header>

  {{{ inputLogin }}}
  {{{ inputPassword }}}

  {{{ button }}}
</main>`;

export class LayoutSheet extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
