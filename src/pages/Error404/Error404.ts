import { LayoutError } from 'layouts';

import imageError from 'images/error-404.svg';
import './Error404.pcss';

const props: Props = {
  title: 'Такой страницы нет 😞',
  image: imageError,
};

export class PageError404 extends LayoutError {
  constructor() {
    super({ ...props });
  }
}
