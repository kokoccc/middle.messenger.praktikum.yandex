import { Block } from 'utils';
import { Avatar } from 'components';

import iconGroup from 'images/group.svg';
import template from './template.hbs';
import './styles.pcss';

interface Props {
  date: string
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
    small: true,
    imagePath: props.imagePath || '',
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
