import { Block, validateTextField } from 'utils';
import { TextFieldInput } from './components/TextFieldInput/TextFieldInput';

import template from './TextField.hbs';
import './TextField.pcss';

interface Props extends IProps {
  class?: string
  error?: boolean
  errorMessage?: string
  hint?: string
  inputmode?: string
  label: string
  matchingFieldName?: string
  name?: string
  placeholder?: string
  type: string
  validations?: TValidationRules,
  value?: string
}

const COMPONENT_BASE_CLASS_NAME = 'ui-text-field';

export class TextField extends Block {
  constructor(props: Props) {
    super({
      input: new TextFieldInput({
        ...props,
        callback: () => this.validate(),
      }),
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  reset() {
    (this.children.input.getContent() as HTMLInputElement).value = '';
  }

  validate() {
    const { validations }: { validations?: TValidationRules } = this.props;

    if (!validations) {
      return true;
    }

    const inputEl = this.children.input.getContent() as HTMLInputElement;
    const { isValid, errorMessages } = validateTextField(inputEl, validations);

    const parentEl = this.getContent();
    const errorEl = parentEl.querySelector(`.${COMPONENT_BASE_CLASS_NAME}__error`) as HTMLElement;

    parentEl.classList.toggle(`${COMPONENT_BASE_CLASS_NAME}--error`, !isValid);
    errorEl.textContent = errorMessages.join('. ');
    errorEl.classList.toggle('d-none', isValid);

    return isValid;
  }
}
