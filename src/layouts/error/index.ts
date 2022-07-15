import { Block } from 'utils';

import './styles.pcss';
import template from './template.hbs';

export class LayoutError extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
