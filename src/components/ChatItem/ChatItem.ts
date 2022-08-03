import { Block } from 'utils';
import { Avatar } from 'components';

import iconGroup from 'images/group.svg';
import template from './ChatItem.hbs';
import './ChatItem.pcss';

interface Props {
  date: string
  events?: Record<string, (event: unknown) => void>
  isActive?: boolean
  isGroup?: boolean
  title: string
  imagePath?: string
  name?: string
  message: string,
  unreadCount?: number
}

const getElements = (props: Props) => ({
  avatar: new Avatar({
    imagePath: props.imagePath || '',
    size: 'small',
  }),
});

export class ChatItem extends Block {
  constructor(props: Props) {
    super({ iconGroup, ...getElements(props), ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
