import { Block, renderDOM } from 'utils';
import { ButtonClose } from 'components';

import template from './Dialog.hbs';

import './Dialog.pcss';

interface Props {
  cancelButton: TBlock
  confirmButton: TBlock
  content: TBlock
  title: string
}

export class Dialog extends Block {
  constructor(props: Props) {
    super({
      buttonClose: new ButtonClose({
        events: {
          click: () => this.hide(),
        },
      }),
      ...props,
    });
  }

  show() {
    renderDOM('#app', this);
  }

  hide() {
    this.getContent().remove();
  }

  render() {
    return this.compile(template, this.props);
  }
}
