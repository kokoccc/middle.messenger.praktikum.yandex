import { Block } from 'utils';

import template from './Button.hbs';

import './Button.pcss';

interface Props {
  class?: string
  danger?: boolean
  events?: Record<string, (event: unknown) => void>
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
}
