import './styles.pcss';
import { Block } from 'utils';
import imageBack from 'images/back.svg';

const template = `
<a class="inline-flex" href="{{ path }}" aria-label="Назад">
  <img src="{{ imageBack }}" width="44" height="44" alt="">
</a>
`;

export class LinkBack extends Block {
  constructor(props: Props) {
    super({ imageBack, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
