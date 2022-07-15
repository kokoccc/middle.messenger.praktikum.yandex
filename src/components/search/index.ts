import './styles.pcss';
import { Block } from 'utils';
import iconSearch from 'images/search.svg';

const template = `
<form class="search relative flex {{ class }}">
  <input class="search__input pl-9 pr-2 px-2 bg-gray-lighter" placeholder="Поиск…">
  <img src="${iconSearch}" class="search__icon absolute">
</form>`;

export class Search extends Block {
  constructor(props: Props = {}) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
