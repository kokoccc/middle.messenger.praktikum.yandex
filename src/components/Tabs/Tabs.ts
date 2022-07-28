import { Block } from 'utils';

import template from './Tabs.hbs';

import './Tabs.pcss';

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
