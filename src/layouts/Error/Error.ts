import { Block } from 'utils';

import template from './Error.hbs';

import './Error.pcss';

export class LayoutError extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
