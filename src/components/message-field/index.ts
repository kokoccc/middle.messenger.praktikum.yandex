import { Block } from 'utils';

import './styles.pcss';
import iconClip from 'images/clip.svg';
import iconEnvelope from 'images/envelope.svg';
import template from './template.hbs';

export class MessageField extends Block {
  constructor(props: Props = {}) {
    super({ iconClip, iconEnvelope, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
