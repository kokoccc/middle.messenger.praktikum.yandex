import {
  Block, globalValidationRules, store, StoreEvents,
} from 'utils';
import { authController, usersController } from 'controllers';
import {
  Avatar, Button, Dialog, Form, LinkBack, TextField,
} from 'components';
import { IUserData } from 'interfaces';
import { ROUTES } from 'constants';
import { LogoutDialog } from './components/LogoutDialog/LogoutDialog';

import template from './Settings.hbs';
import './Settings.pcss';

const dialogCancelButton = new Button({
  class: 'flex-grow-1',
  secondary: true,
  text: 'Не выходить',
  type: 'button',
});

const dialogConfirmButton = new Button({
  text: 'Выйти',
  type: 'button',
});

const dialog = new Dialog({
  cancelButton: dialogCancelButton,
  confirmButton: dialogConfirmButton,
  title: 'Выйти из аккаунта?',
  content: new LogoutDialog(),
});

dialogCancelButton.setProps({
  events: {
    click: () => dialog.hide(),
  },
});

dialogConfirmButton.setProps({
  events: {
    click: () => authController.logout({ button: dialogConfirmButton }),
  },
});

const avatar = new Avatar({
  class: 'mx-auto mt-10',
  onImageUpload: (event: Event) => {
    const [file] = (<HTMLInputElement>event.target).files as FileList;
    usersController.changeAvatar({ file, component: avatar });
  },
});

const fields = {
  login: new TextField({
    label: 'Логин',
    name: 'login',
    placeholder: 'vasyapupkin',
    type: 'text',
    validations: globalValidationRules.login,
  }),
  displayName: new TextField({
    label: 'Имя в чате',
    name: 'display_name',
    placeholder: 'Vasya',
    type: 'text',
  }),
  firstName: new TextField({
    label: 'Имя',
    name: 'first_name',
    placeholder: 'Василий',
    type: 'text',
    validations: globalValidationRules.name,
  }),
  secondName: new TextField({
    label: 'Фамилия',
    name: 'second_name',
    placeholder: 'Пупкин',
    type: 'text',
    validations: globalValidationRules.name,
  }),
  phone: new TextField({
    inputmode: 'tel',
    label: 'Телефон',
    name: 'phone',
    placeholder: '+79031112233',
    type: 'tel',
    validations: globalValidationRules.phone,
  }),
  email: new TextField({
    inputmode: 'email',
    label: 'E-mail',
    name: 'email',
    placeholder: 'vasya@mail.ru',
    type: 'email',
    validations: globalValidationRules.email,
  }),
};

const elements = {
  linkBack: new LinkBack({
    path: '/messenger',
  }),
  avatar,
  buttonExit: new Button({
    class: 'mt-3 text-body-medium',
    danger: true,
    outlined: true,
    text: 'Выйти из аккаунта',
    type: 'button',
    events: {
      click: () => dialog.show(),
    },
  }),
};

export class PageSettings extends Block {
  constructor(props: IProps = {}) {
    super({
      ...props,
      ...elements,
      form: new Form({
        fields: [
          fields.login,
          fields.displayName,
          fields.firstName,
          fields.secondName,
          fields.phone,
          fields.email,
        ],
        button: new Button({
          text: 'Сохранить',
          class: 'mt-1 align-self-center',
        }),
        submit(formData: TFormData) {
          usersController.changeProfile({
            data: formData,
            button: this.button,
          });
        },
      }),
      passwordChangePath: ROUTES.password,
    });

    store.on(StoreEvents.Updated, this.updateProps);
    this.updateProps();
  }

  updateProps() {
    const state = store.getState();
    const user = state.user as IUserData | null;

    if (user) {
      if (user.avatar) {
        this.children.avatar.setProps({ imagePath: user.avatar });
      }

      fields.login.setProps({ value: user.login });
      fields.displayName.setProps({ value: user.display_name });
      fields.firstName.setProps({ value: user.first_name });
      fields.secondName.setProps({ value: user.second_name });
      fields.phone.setProps({ value: user.phone });
      fields.email.setProps({ value: user.email });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
