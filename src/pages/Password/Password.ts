import { Block, globalValidationRules } from 'utils';
import { usersController } from 'controllers';
import {
  Button, Form, LinkBack, TextField,
} from 'components';

import template from './Password.hbs';
import './Password.pcss';

export class PagePassword extends Block {
  constructor(props: IProps = {}) {
    super({
      ...props,
      linkBack: new LinkBack({
        path: '/settings',
      }),
      form: new Form({
        fields: [
          new TextField({
            label: 'Текущий пароль',
            name: 'oldPassword',
            placeholder: '••••••••',
            type: 'password',
            validations: globalValidationRules.password,
          }),
          new TextField({
            label: 'Новый пароль',
            name: 'newPassword',
            placeholder: '••••••••',
            type: 'password',
            validations: globalValidationRules.password,
          }),
          new TextField({
            label: 'Новый пароль (еще раз)',
            name: 'newPasswordConfirm',
            placeholder: '••••••••',
            type: 'password',
            validations: [
              ...globalValidationRules.password,
              {
                compareFieldName: 'newPassword',
                message: 'Пароли не соответствуют друг другу',
              },
            ],
          }),
        ],
        button: new Button({
          text: 'Сохранить',
          class: 'mt-1 align-self-center',
        }),
        submit(formData: TFormData) {
          usersController.changePassword({
            data: formData,
            button: this.button,
            fields: this.fields,
          });
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
