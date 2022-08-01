import { Block } from 'utils';

import template from './AvatarInput.hbs';

import './AvatarInput.pcss';

interface Props {
  events: Record<string, (event: Event) => void>
}

export class AvatarInput extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
