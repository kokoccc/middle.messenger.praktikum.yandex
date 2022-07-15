import './styles.pcss';
import { Block } from 'utils';
import iconClip from 'images/clip.svg';
import iconEnvelope from 'images/envelope.svg';

const template = `
<form class="message-field flex">
  <label class="message-field__file relative flex p-3">
    <img src="${iconClip}" class="message-field__file-icon m-auto">
    <input type="file" class="message-field__file-input absolute inset-0">
  </label>
  <input placeholder="Написать сообщение…" class="message-field__input px-2 py-4">
  <button class="message-field__submit flex px-3 py-2">
    <img src="${iconEnvelope}" class="message-field__submit-icon m-auto">
  </button>
</form>`;

export class MessageField extends Block {
  constructor(props: Props = {}) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
