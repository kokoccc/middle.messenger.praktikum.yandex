import { Block } from 'utils';
import { TextField } from 'components';

import template from './Form.hbs';
import './Form.pcss';

interface FormProps {
  button: TButton
  events?: TEventsProp
  fields: TTextField[]
  submit?: (formData: TSubmitData) => void
}

export class Form extends Block {
  constructor(props: FormProps) {
    super({
      events: {
        submit: (event: Event) => {
          if (!props.submit) {
            return;
          }

          event.preventDefault();

          const isValid = this.validate();

          if (isValid) {
            const formEl = this.getContent() as HTMLFormElement;
            const formData = Object.fromEntries([...new FormData(formEl)]);

            props.submit(formData);
          }
        },
      },
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  validate() {
    const childBlocks = Object.values(this.children);

    let allFieldsAreValid = true;

    childBlocks.forEach((childBlock) => {
      if (childBlock instanceof TextField && !childBlock.validate()) {
        allFieldsAreValid = false;
      }
    });

    return allFieldsAreValid;
  }
}
