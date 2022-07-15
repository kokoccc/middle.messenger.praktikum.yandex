import './styles.pcss';
import { Block } from 'utils';
import iconSending from './images/sending.svg';
import iconSendingWhite from './images/sending-white.svg';
import iconSent from './images/sent.svg';
import iconSentWhite from './images/sent-white.svg';
import iconRead from './images/read.svg';
import iconReadWhite from './images/read-white.svg';

const template = `
<article class="
  message relative shadow-sheet
  {{#if incoming}} message--incoming {{else}} message--outcoming {{/if}}
  {{#if image}}
    flex
  {{ else }}
    px-4 pt-3 pb-2
    {{#if incoming}} bg-gray-lightest {{else}} bg-blue-lightest {{/if}}
  {{/if}}
">
  {{#if image}}
  <img src="{{ image }}" class="message__image">
  {{else}}
  <p class="message__text m-0">{{ text }}</p>
  {{/if}}

  <div class="
    message__meta flex align-baseline gap-2 justify-end
    {{#if image}}
      message__meta--surfaced absolute bg-overlay
    {{else}}
      mt-1
    {{/if}}
  ">
    <time class="message__time {{#if image}}message__time--surfaced{{/if}} text-caption {{#if image}}white{{else}}gray{{/if}}">
      {{ time }}
    </time>

    {{#unless incoming}}
      {{#if read}}
      <img src="{{#if image}}${iconReadWhite}{{else}}${iconRead}{{/if}}" class="message__status {{#if image}}message__status--surfaced{{/if}}">
      {{else}}
        {{#if sent}}
        <img src="{{#if image}}${iconSentWhite}{{else}}${iconSent}{{/if}}" class="message__status {{#if image}}message__status--surfaced{{/if}}">
        {{else}}
        <img src="{{#if image}}${iconSendingWhite}{{else}}${iconSending}{{/if}}" class="message__status {{#if image}}message__status--surfaced{{/if}}">
        {{/if}}
      {{/if}}
    {{/unless}}
  </div>
</article>`;

interface props {
  time: string,
  image?: string
  incoming: boolean
  text?: string
  read?: boolean
  sending?: boolean
  sent?: boolean
}

export class Message extends Block {
  constructor(props: props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
