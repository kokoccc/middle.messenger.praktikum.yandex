import './error-500.pcss';
import LayoutError from 'layouts/error';
import imageError from 'images/error-500.svg';

const metaData = {
  title: 'Ошибка сервера',
  subtitle: 'Уже исправляем',
  image: imageError,
};

export class PageError500 extends LayoutError {
  constructor() {
    super({ props: metaData });
  }
}

/*
import './error-500.pcss';
import { Block } from 'utils';

import imageError from 'images/error-500.svg';

const template = `
<main class="relative flex-full flex justify-center align-center px-4 py-2">
<section class="flex flex-column align-center">
  <h1 class="text-title-1">Ошибка сервера</h1>

  <h2 class="mt-2 text-title-3">Уже исправляем</h2>

  <a href="/" class="mt-6 mt-md-12 text-body-medium blue-dark" @="">Вернуться к списку чатов</a>
</section>

<img src="${imageError}" class="page-error__image absolute z-negative center" alt="" />
</main>
`;

export class PageError500 extends Block {
  constructor(props: Props = {}) {
    super('div', { props });
  }

  render(): string {
    return template;
  }
}
*/
