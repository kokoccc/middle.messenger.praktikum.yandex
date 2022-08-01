import { Block } from 'utils';

import imageClose from 'images/close.svg';
import template from './ButtonClose.hbs';

import './ButtonClose.pcss';

export class ButtonClose extends Block {
  constructor(props: Props) {
    super({ imageClose, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
