import './styles.pcss';
import { Block } from 'utils';
import template from './template.hbs';

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
