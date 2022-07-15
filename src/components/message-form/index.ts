import { Block } from 'utils';

import './styles.pcss';
import iconClip from 'images/clip.svg';
import iconEnvelope from 'images/envelope.svg';
import template from './template.hbs';

export class MessageForm extends Block {
  constructor(props: Props = {}) {
    super({
      iconClip,
      iconEnvelope,
      ...props,
      form: 'message-form',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
