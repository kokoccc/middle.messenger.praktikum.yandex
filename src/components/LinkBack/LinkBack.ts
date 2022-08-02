import { Block } from 'utils';

import imageBack from 'images/back.svg';
import template from './LinkBack.hbs';
import './LinkBack.pcss';

export class LinkBack extends Block {
  constructor(props: IProps) {
    super({ imageBack, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
