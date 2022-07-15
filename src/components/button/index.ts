import './styles.pcss';
import { Block } from 'utils';
import template from './template.hbs';

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
