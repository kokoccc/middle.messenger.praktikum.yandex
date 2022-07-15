import { Block } from 'utils';

import './styles.pcss';
import template from './template.hbs';

interface Props {
  class?: string
  error?: boolean
  errorMessage?: string
  events?: Record<string, (event: unknown) => void>
  hint?: string
  inputmode?: string
  label: string
  name?: string
  placeholder?: string
  success?: boolean
  type: string
  validate?: boolean
  value?: string
}

export class TextField extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
