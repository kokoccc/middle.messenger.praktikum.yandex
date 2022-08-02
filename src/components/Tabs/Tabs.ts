import { ROUTES } from 'constants';
import { Block } from 'utils';

import template from './Tabs.hbs';
import './Tabs.pcss';

export class Tabs extends Block {
  constructor(props: IProps = {}) {
    super({
      pages: [
        { title: 'Вход', path: ROUTES.login },
        { title: 'Регистрация', path: ROUTES.signUp },
      ],
      pathname: window.location.pathname,
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
