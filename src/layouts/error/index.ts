import './styles.pcss';
import { Block } from 'utils';
import template from './template.hbs';

export class LayoutError extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
