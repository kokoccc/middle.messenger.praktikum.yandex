import { LayoutError } from 'layouts';

import imageError from 'images/error-500.svg';
import './Error500.pcss';

export class PageError500 extends LayoutError {
  constructor(props: IProps = {}) {
    super({
      ...props,
      title: 'Ошибка сервера',
      subtitle: 'Уже исправляем',
      image: imageError,
    });
  }
}
