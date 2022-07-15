import { Block } from 'utils';

import './styles.pcss';
import template from './template.hbs';

interface props {
  isLogin: boolean
}

export class Tabs extends Block {
  constructor(props: props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
