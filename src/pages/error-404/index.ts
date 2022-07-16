import { LayoutError } from 'layouts';

import './styles.pcss';
import imageError from 'images/error-404.svg';

const props: Props = {
  title: 'Такой страницы нет 😞',
  image: imageError,
};

export class PageError404 extends LayoutError {
  constructor() {
    super({ ...props });
  }
}
