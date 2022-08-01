import {
  Block,
  globalValidationRules,
  submitForm,
  store,
  StoreEvents,
} from 'utils';
import { authController, usersController } from 'controllers';
import {
  Avatar,
  Button,
  Dialog,
  LinkBack,
  TextField,
} from 'components';
import { IUserData } from 'interfaces';
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

const elements = {
  avatar,
  linkBack: new LinkBack({
    path: '/messenger',
  }),
  inputLogin: new TextField({
    label: 'Логин',
    name: 'login',
    placeholder: 'vasyapupkin',
    type: 'text',
    validation: {
      rules: globalValidationRules.login,
    },
  }),
  inputDisplayName: new TextField({
    label: 'Имя в чате',
    name: 'display_name',
    placeholder: 'Vasya',
    type: 'text',
  }),
  inputFirstName: new TextField({
    label: 'Имя',
    name: 'first_name',
    placeholder: 'Василий',
    type: 'text',
    validation: {
      rules: globalValidationRules.name,
    },
  }),
  inputSecondName: new TextField({
    label: 'Фамилия',
    name: 'second_name',
    placeholder: 'Пупкин',
    type: 'text',
    validation: {
      rules: globalValidationRules.name,
    },
  }),
  inputPhone: new TextField({
    inputmode: 'tel',
    label: 'Телефон',
    name: 'phone',
    placeholder: '+79031112233',
    type: 'tel',
    validation: {
      rules: globalValidationRules.phone,
    },
  }),
  inputEmail: new TextField({
    inputmode: 'email',
    label: 'E-mail',
    name: 'email',
    placeholder: 'vasya@mail.ru',
    type: 'email',
    validation: {
      rules: globalValidationRules.email,
    },
  }),
  button: new Button({
    text: 'Сохранить',
    class: 'mt-1 align-self-center',
  }),
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
  constructor() {
    super({
      ...elements,
      form: {
        selector: '.form--settings',
        fields: [
          elements.inputLogin,
          elements.inputDisplayName,
          elements.inputFirstName,
          elements.inputSecondName,
          elements.inputPhone,
          elements.inputEmail,
        ],
        submit: (formEl: HTMLFormElement) => {
          submitForm(formEl, usersController.changeProfile, elements.button);
        },
      },
    });

    store.on(StoreEvents.Updated, () => {
      const state = store.getState();
      const user = state.user as IUserData | null;

      if (user) {
        elements.avatar.setProps({ imagePath: user.avatar });
        elements.inputLogin.setProps({ value: user.login });
        elements.inputDisplayName.setProps({ value: user.display_name });
        elements.inputFirstName.setProps({ value: user.first_name });
        elements.inputSecondName.setProps({ value: user.second_name });
        elements.inputPhone.setProps({ value: user.phone });
        elements.inputEmail.setProps({ value: user.email });
      }
    });

    authController.getUser();
  }

  render() {
    return this.compile(template, this.props);
  }
}
