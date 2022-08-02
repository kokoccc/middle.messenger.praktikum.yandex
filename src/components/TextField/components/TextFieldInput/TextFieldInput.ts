import { Block } from 'utils';

import template from './TextFieldInput.hbs';
import './TextFieldInput.pcss';

interface Props extends IProps {
  callback?: (event: Event) => void
  error?: boolean
  inputmode?: string
  name?: string
  placeholder?: string
  type: string
  value?: string
}

export class TextFieldInput extends Block {
  constructor(props: Props) {
    super({
      events: {
        blur: props.callback,
        focus: props.callback,
      },
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
