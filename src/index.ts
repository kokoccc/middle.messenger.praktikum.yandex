import { ROUTES } from 'constants';
import { router, preloader } from 'utils';

import { LayoutSheet } from 'layouts';
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
  .use({
    route: ROUTES.login, view: PageLogin, layout: LayoutSheet, access: 'unauth',
  })
  .use({
    route: ROUTES.signUp, view: PageSignUp, layout: LayoutSheet, access: 'unauth',
  })
  .use({ route: ROUTES.chats, view: PageChats, access: 'auth' })
  .use({
    route: ROUTES.settings, view: PageSettings, layout: LayoutSheet, access: 'auth',
  })
  .use({
    route: ROUTES.password, view: PagePassword, layout: LayoutSheet, access: 'auth',
  })
  .use({ route: ROUTES.error500, view: PageError500 })
  .use({ route: '*', view: PageError404 })
  .start();
