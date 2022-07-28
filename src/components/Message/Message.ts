import { Block } from 'utils';

import iconSending from 'images/sending.svg';
import iconSendingWhite from 'images/sending-white.svg';
import iconSent from 'images/sent.svg';
import iconSentWhite from 'images/sent-white.svg';
import iconRead from 'images/read.svg';
import iconReadWhite from 'images/read-white.svg';
import template from './Message.hbs';

import './Message.pcss';

interface Props {
  time: string,
  image?: string
  incoming: boolean
  text?: string
  read?: boolean
  sending?: boolean
  sent?: boolean
}

export class Message extends Block {
  constructor(props: Props) {
    super({
      iconSending,
      iconSendingWhite,
      iconSent,
      iconSentWhite,
      iconRead,
      iconReadWhite,
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
