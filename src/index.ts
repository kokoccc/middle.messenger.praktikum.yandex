import { ROUTES } from 'constants';
import { router, preloader } from 'utils';

import {
  PageChats,
  PageError404,
  PageError500,
  PageLogin,
  PageSettings,
  PagePassword,
  PageSignUp,
} from 'pages';

import './styles/styles.pcss';

preloader.show();

router
  .use(ROUTES.login, PageLogin, 'unauth')
  .use(ROUTES.signUp, PageSignUp, 'unauth')
  .use(ROUTES.chats, PageChats, 'auth')
  .use(ROUTES.settings, PageSettings, 'auth')
  .use(ROUTES.password, PagePassword, 'auth')
  .use(ROUTES.error500, PageError500)
  .use('*', PageError404)
  .start();
