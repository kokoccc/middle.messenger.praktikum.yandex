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
  .use(['/', '/login'], PageLogin, 'unauth')
  .use('/sign-up', PageSignUp, 'unauth')
  .use('/messenger', PageChats, 'auth')
  .use('/settings', PageSettings, 'auth')
  .use('/password', PagePassword, 'auth')
  .use('/500', PageError500)
  .use('*', PageError404)
  .start();
