import { Block } from 'utils';
import { Avatar } from 'components';

import iconGroup from 'images/group.svg';
import template from './ChatItem.hbs';
import './ChatItem.pcss';

interface IComponentProps extends IProps {
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

export class ChatItem extends Block {
  constructor(props: IComponentProps) {
    super({
      ...props,
      iconGroup,
      avatar: new Avatar({
        imagePath: props.imagePath || '',
        size: 'small',
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
