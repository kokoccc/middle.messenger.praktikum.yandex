import { Block } from 'utils';

import './styles.pcss';
import imageAvatarDefault from 'images/avatar.svg';
import template from './template.hbs';

interface Props {
  class?: string
  imagePath?: string
  small?: boolean
  smallest?: boolean
}

export class Avatar extends Block {
  constructor(props: Props = {}) {
    super({ imageAvatarDefault, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
