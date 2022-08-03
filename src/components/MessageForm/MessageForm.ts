import { Block } from 'utils';

import iconClip from 'images/clip.svg';
import iconEnvelope from 'images/envelope.svg';
import template from './MessageForm.hbs';
import './MessageForm.pcss';

export class MessageForm extends Block {
  constructor(props: IProps = {}) {
    super({
      ...props,
      iconClip,
      iconEnvelope,
      formSelector: '.message-form',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
