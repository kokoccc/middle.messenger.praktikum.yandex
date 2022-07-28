import { Block } from 'utils';

import imageAvatarDefault from 'images/avatar.svg';
import template from './Avatar.hbs';

import './Avatar.pcss';

interface Props {
  class?: string
  imagePath?: string
  size?: string
}

export class Avatar extends Block {
  constructor(props: Props = {}) {
    super({ imageAvatarDefault, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
