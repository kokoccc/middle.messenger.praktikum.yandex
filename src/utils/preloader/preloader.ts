import { Block, renderDOM } from 'utils';
import template from './preloader.hbs';

import './preloader.pcss';

class Preloader extends Block {
  constructor(props: IProps = {}) {
    super({ ...props });
  }

  show() {
    document.documentElement.style.overflow = 'hidden';
    renderDOM('#app', this);
  }

  hide() {
    document.documentElement.style.overflow = 'auto';
    this.getContent().remove();
  }

  render() {
    return this.compile(template);
  }
}

export const preloader = new Preloader();
