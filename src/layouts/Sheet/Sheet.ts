import { Block } from 'utils';

import template from './Sheet.hbs';
import './Sheet.pcss';

interface ILayoutProps {
  content: IProps
}

export class LayoutSheet extends Block {
  constructor(props: ILayoutProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
