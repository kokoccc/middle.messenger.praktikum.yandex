import { Block } from 'utils';

import template from './LogoutDialog.hbs';
import './LogoutDialog.pcss';

export class LogoutDialog extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
