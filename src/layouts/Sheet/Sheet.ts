import { Block } from 'utils';

import template from './Sheet.hbs';
import './Sheet.pcss';

interface Props {
  content: IProps
}

export class LayoutSheet extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
