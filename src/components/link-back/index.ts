import './styles.pcss';
import { Block } from 'utils';
import imageBack from 'images/back.svg';
import template from './template.hbs';

export class LinkBack extends Block {
  constructor(props: Props) {
    super({ imageBack, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
