import './styles.pcss';
import { Block } from 'utils';
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
