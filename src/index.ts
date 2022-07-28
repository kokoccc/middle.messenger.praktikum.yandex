import { Router } from 'utils';
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

const APP_SELECTOR = '#app';

const router = new Router(APP_SELECTOR);

router
  .use(['/', '/messenger'], PageChats)
  .use('/login', PageLogin)
  .use('/sign-up', PageSignUp)
  .use('/settings', PageSettings)
  .use('/password', PagePassword)
  .use('/500', PageError500)
  .use('*', PageError404)
  .start();
