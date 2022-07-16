import { Block, renderDOM } from 'utils';
import {
  PageChats,
  PageError404,
  PageError500,
  PageLogin,
  PagePassword,
  PageProfile,
  PageSignup,
} from 'pages';

import './styles/styles.pcss';

const APP_SELECTOR = '#app';

const pages: Record<number | string, { new(): Block }> = {
  '': PageChats,
  404: PageError404,
  500: PageError500,
  chats: PageChats,
  login: PageLogin,
  password: PagePassword,
  profile: PageProfile,
  signup: PageSignup,
};

const renderPage = (): void => {
  const pathname = window.location.pathname.replace(/^\/|\/$/g, '');
  const Page = pages[pathname] || pages['404'];

  renderDOM(APP_SELECTOR, new Page());
};

document.addEventListener('DOMContentLoaded', renderPage);
