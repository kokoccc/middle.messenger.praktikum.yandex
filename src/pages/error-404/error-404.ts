import './error-404.pcss';
import LayoutError from 'layouts/error';
import imageError from 'images/error-404.svg';

const metaData = {
  title: 'Такой страницы нет 😞',
  image: imageError,
};

const template = `
<div class="red">Здарова</div>
`;

export class PageError404 extends LayoutError {
  constructor() {
    super({ props: metaData }, template);
  }
}
