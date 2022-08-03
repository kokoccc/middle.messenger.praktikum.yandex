import { Block } from 'utils';

import template from './AvatarInput.hbs';
import './AvatarInput.pcss';

export class AvatarInput extends Block {
  constructor(props: IProps = {}) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
