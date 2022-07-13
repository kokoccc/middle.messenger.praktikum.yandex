import './styles/styles.pcss';
import { Block, renderDOM } from 'utils';
import PageError404 from './pages/error-404';
import PageError500 from './pages/error-500';

type block = { new(): Block };
type pageData = Record<string, string | block>;

const APP_SELECTOR = '#app';

const pages: Record<string | number, pageData> = {
  404: { title: 'Страница не найдена', page: PageError404 },
  500: { title: 'Ошибка сервера', page: PageError500 },
  // login: { title: 'Авторизация', page: PageLogin },
};

const renderPage = (): void => {
  const pathname = window.location.pathname.replace(/^\/|\/$/g, '');
  const page = pathname in pages ? pages[pathname] : pages[404];
  const PageBlock = page.page as block;

  renderDOM(APP_SELECTOR, new PageBlock());
};

document.addEventListener('DOMContentLoaded', renderPage);
