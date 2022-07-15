import './styles.pcss';
import { Block } from 'utils';
import imageAvatarDefault from 'images/avatar.svg';
import template from './template.hbs';

interface props {
  class?: string
  imagePath?: string
  small?: boolean
  smallest?: boolean
}

export class Avatar extends Block {
  constructor(props: props = {}) {
    super({ imageAvatarDefault, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
