import { Block } from 'utils';

import template from './Error.hbs';
import './Error.pcss';

interface ILayoutProps extends IProps {
  title: string
  subtitle?: string
  image: string
}

export class LayoutError extends Block {
  constructor(props: ILayoutProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
