import { Block } from 'utils';

import imageBack from 'images/back.svg';
import template from './LinkBack.hbs';
import './LinkBack.pcss';

interface IComponentProps extends IProps {
  path: string
}

export class LinkBack extends Block {
  constructor(props: IComponentProps) {
    super({ ...props, imageBack });
  }

  render() {
    return this.compile(template, this.props);
  }
}
