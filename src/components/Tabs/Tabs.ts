import { ROUTES } from 'constants';
import { Block } from 'utils';

import template from './Tabs.hbs';
import './Tabs.pcss';

export class Tabs extends Block {
  constructor(props: IProps = {}) {
    super({
      ...props,
      pages: [
        { title: 'Вход', path: ROUTES.login },
        { title: 'Регистрация', path: ROUTES.signUp },
      ],
      pathname: window.location.pathname,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
