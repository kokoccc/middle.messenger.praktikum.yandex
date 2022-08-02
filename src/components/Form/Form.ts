import { Block } from 'utils';

import template from './Form.hbs';
import './Form.pcss';

interface Props {
  button: Block
  events?: TEventsProp
  fields: Block[]
}

export class Form extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
