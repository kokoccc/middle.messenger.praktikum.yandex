import './styles.pcss';
import { Block } from 'utils';

const template = `
<form class="form {{ class }}">
{{{ inputLogin }}}
{{{ inputPassword }}}
{{{ button }}}
</form>
`;

interface props {
  class?: string
  buttonText: string
}

export class LayoutSheet extends Block {
  constructor(props: props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
