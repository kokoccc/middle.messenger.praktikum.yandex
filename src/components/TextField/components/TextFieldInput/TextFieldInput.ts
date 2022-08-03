import { Block } from 'utils';

import template from './TextFieldInput.hbs';
import './TextFieldInput.pcss';

interface IComponentProps extends IProps {
  callback?: (event: Event) => void
  error?: boolean
  inputmode?: string
  name?: string
  placeholder?: string
  type: string
  value?: string
}

export class TextFieldInput extends Block {
  constructor(props: IComponentProps) {
    super({
      ...props,
      events: {
        blur: props.callback,
        focus: props.callback,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
