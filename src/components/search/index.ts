import './styles.pcss';
import { Block } from 'utils';
import iconSearch from 'images/search.svg';
import template from './template.hbs';

export class Search extends Block {
  constructor(props: Props = {}) {
    super({ iconSearch, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
