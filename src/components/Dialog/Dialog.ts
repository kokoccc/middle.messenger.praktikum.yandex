import { Block, renderDOM } from 'utils';
import { ButtonClose } from 'components';

import template from './Dialog.hbs';
import './Dialog.pcss';

interface IComponentProps extends IProps {
  cancelButton: TBlock
  confirmButton: TBlock
  content: TBlock
  title: string
}

export class Dialog extends Block {
  constructor(props: IComponentProps) {
    super({
      ...props,
      buttonClose: new ButtonClose({
        events: {
          click: () => this.hide(),
        },
      }),
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
