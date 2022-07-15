import './styles.pcss';
import { Block } from 'utils';
import { Avatar } from 'components';
import iconGroup from 'images/group.svg';

const template = `
<acticle class="chat-item flex gap-3 px-3 py-4 {{#if isActive}}chat-item--active bg-blue-lightest{{/if}}">
  {{{ avatar }}}
  <div class="chat-item__meta flex-grow-1 flex flex-wrap align-content-center gap-1">
    <div class="flex-full flex align-center">
      {{#if isGroup}}
      <img src="${iconGroup}" width="14" height="14" class="mr-2">
      {{/if}}

      <span class="text-body-semi-bold">{{ title }}</span>
      <span class="ml-auto text-caption gray">{{ date }}</span>
    </div>
    <div class="flex-full flex align-baseline">
      {{#if name}}
      <span class="mr-1 text-body-medium gray-dark">{{ name }}:</span>
      {{/if}}

      <span class="chat-item__message gray">{{ message }}</span>

      {{#if unreadCount}}
      <span class="chat-item__unread ml-auto bg-blue white">{{ unreadCount }}</span>
      {{/if}}
    </div>
  </div>
</acticle>`;

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
    super({ ...getElements(props), ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
