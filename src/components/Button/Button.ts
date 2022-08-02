import { Block } from 'utils';

import template from './Button.hbs';
import './Button.pcss';

interface Props extends IProps {
  class?: string
  danger?: boolean
  loading?: boolean
  outlined?: boolean
  secondary?: boolean
  text: string
  type?: string
}

export class Button extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }

  setLoading = () => {
    this.setProps({ loading: true });
  };

  unsetLoading = () => {
    this.setProps({ loading: false });
  };
}
