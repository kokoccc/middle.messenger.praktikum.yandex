import './styles.pcss';
import { Block } from 'utils';
import { Avatar } from 'components';
import iconGroup from 'images/group.svg';
import template from './template.hbs';

interface props {
  date: string
  isActive?: boolean
  isGroup?: boolean
  title: string
  imagePath?: string
  name?: string
  message: string,
  unreadCount?: number
}

const getElements = (props: props) => ({
  avatar: new Avatar({
    small: true,
    imagePath: props.imagePath || '',
  }),
});

export class ChatItem extends Block {
  constructor(props: props) {
    super({ iconGroup, ...getElements(props), ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
