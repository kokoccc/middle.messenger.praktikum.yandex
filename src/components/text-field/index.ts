import './styles.pcss';
import { Block } from 'utils';

const template = `
<label class="ui-text-field flex flex-wrap {{ class }}">
  <input
    type="{{ type }}"
    {{#if name}} name="{{name}}" {{/if}}
    {{#if inputmode}} inputmode="{{inputmode}}" {{/if}}
    {{#if placeholder}} placeholder="{{placeholder}}" {{/if}}
    {{#if value}} value="{{value}}" {{/if}}
    class="
      ui-text-field__input px-3
      {{#if success}} ui-text-field__input--success {{/if}}
      {{#if error}} ui-text-field__input--error {{/if}}
    "
  >

  <span class="
    ui-text-field__label flex-full mb-1 mb-md-0 text-right text-body-medium
    {{#if success}} ui-text-field__label--success {{/if}}
    {{#if error}} ui-text-field__label--error {{/if}}
  ">
    {{ label }}
  </span>

  {{#if hint}}
  <span class="ui-text-field__hint flex-full mt-1 text-md-right text-body-medium gray">{{ hint }}</span>
  {{/if}}

  {{#if error}}
  <span class="ui-text-field__error flex-full mt-1 text-md-right text-body-medium red">{{ errorMessage }}</span>
  {{/if}}
</label>
`;

interface props {
  class?: string,
  error?: boolean,
  errorMessage?: string,
  events?: Record<string, (event: unknown) => void>,
  hint?: string,
  inputmode?: string,
  label: string,
  name?: string,
  placeholder?: string,
  success?: boolean,
  type: string,
  value?: string,
}

export class TextField extends Block {
  constructor(props: props) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
