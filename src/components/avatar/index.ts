import './styles.pcss';
import { Block } from 'utils';
import imageAvatarDefault from 'images/avatar.svg';

const template = `
<div class="
  flex-shrink-0
  avatar-wrapper
  flex bg-gray-lightest
  {{#if small}} avatar-wrapper--small
    {{#unless imagePath}}p-3{{/unless}}
  {{/if}}
  {{#if smallest}} avatar-wrapper--smallest {{/if}}
  {{#unless imagePath}} p-2 {{/unless}}
  {{ class }}
">
{{#if imagePath}}
  <img
    class="avatar m-auto"
    src="{{ imagePath }}"
    alt=""
  >
{{else}}
  <img
    class="avatar m-auto"
    src="{{ imageAvatarDefault }}"
    alt=""
  >
{{/if}}
</div>`;

interface props {
  class?: string
  imagePath?: string
  small?: boolean
  smallest?: boolean
}

export class Avatar extends Block {
  constructor(props: props = {}) {
    super({ imageAvatarDefault, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
