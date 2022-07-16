import { Block } from 'utils';

import './styles.pcss';
import imageBack from 'images/back.svg';
import template from './template.hbs';

export class LinkBack extends Block {
  constructor(props: Props) {
    super({ imageBack, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
