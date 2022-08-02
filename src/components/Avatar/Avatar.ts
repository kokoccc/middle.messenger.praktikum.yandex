import { Block } from 'utils';
import imageAvatarDefault from 'images/avatar.svg';
import { AvatarInput } from './components/AvatarInput/AvatarInput';

import template from './Avatar.hbs';

import './Avatar.pcss';

interface Props {
  class?: string
  events?: Record<string, (event: Event) => void>
  imagePath?: string
  input?: TBlock
  onImageUpload?: (event: Event) => void
  size?: string
}

export class Avatar extends Block {
  constructor(props: Props = {}) {
    const propss = {
      imageAvatarDefault,
      ...props,
    };

    const { onImageUpload } = props;

    if (onImageUpload) {
      propss.input = new AvatarInput({
        events: {
          change: (event: Event) => onImageUpload(event),
        },
      });
    }

    super(propss);
  }

  render() {
    return this.compile(template, this.props);
  }
}
