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
  .use(['/', '/login'], PageLogin)
  .use('/sign-up', PageSignUp)
  .use('/messenger', PageChats, true)
  .use('/settings', PageSettings, true)
  .use('/password', PagePassword, true)
  .use('/500', PageError500)
  .use('*', PageError404)
  .start();
