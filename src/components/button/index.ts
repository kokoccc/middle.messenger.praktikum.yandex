import { Block } from 'utils';

import './styles.pcss';
import template from './template.hbs';

interface Props {
  text: string
  type?: string
  class?: string
  events?: Record<string, (event: unknown) => void>
}

export class Button extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
