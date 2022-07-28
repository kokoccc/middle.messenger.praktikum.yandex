import { LayoutError } from 'layouts';

import imageError from 'images/error-500.svg';
import './Error500.pcss';

const props: Props = {
  title: 'Ошибка сервера',
  subtitle: 'Уже исправляем',
  image: imageError,
};

export class PageError500 extends LayoutError {
  constructor() {
    super({ ...props });
  }
}
