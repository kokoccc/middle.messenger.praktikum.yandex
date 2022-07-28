import { Block } from 'utils';

import template from './TextField.hbs';

import './TextField.pcss';

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
  type: string
  validation?: unknown,
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
