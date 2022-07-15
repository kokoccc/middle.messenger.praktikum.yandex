import './styles.pcss';
import { Block } from 'utils';

const template = `
<button
  class="ui-btn px-4 py-2 text-body-medium {{ class }}"
  {{#if type}} type="{{type}}" {{/if}}
>
  {{ text }}
</button>
`;

interface props {
  text: string
  type?: string
  class?: string
  events?: Record<string, (event: unknown) => void>
}

export class Button extends Block {
  constructor(props: props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
