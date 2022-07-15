import { Block } from 'utils';

import './styles.pcss';
import template from './template.hbs';

interface Props {
  isLogin: boolean
}

export class Tabs extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
