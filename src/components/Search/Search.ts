import { Block } from 'utils';

import iconSearch from 'images/search.svg';
import template from './Search.hbs';
import './Search.pcss';

export class Search extends Block {
  constructor(props: IProps = {}) {
    super({ ...props, iconSearch });
  }

  render() {
    return this.compile(template, this.props);
  }
}
