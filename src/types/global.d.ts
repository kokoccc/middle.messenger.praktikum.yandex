import { Block } from 'utils';
import { Button, TextField } from 'components';

declare global {
  // GENERAL
  export type TBlock = Block;
  export type TypeofBlock = typeof Block;

  // COMPONENTS
  export type TButton = Button;
  export type TTextField = TextField;

  // TYPES
  export type TIndexed<T = unknown> = { [key in string]: T; };

  export type Props = Record<string, unknown>;
  export type TSubmitData = { [k: string]: FormDataEntryValue; };

  export type TEventsProp = Record<string, (event: Event) => unknown>

  export interface IProps extends TIndexed {
    events?: TEventsProp
  }

  export interface Form {
    selector: string
    fields: TBlock[]
    button: TBlock
    submit: (formEl: HTMLFormElement) => void
  }

  // VALIDATION
  export interface IValidationRuleRegex {
    regex: RegExp
    message: string
    negative?: boolean
  }
  export interface IValidationRuleCompare {
    compareFieldName: string,
    message: string
  }
  export interface IValidationRule {
    regex?: RegExp
    negative?: boolean
    compareFieldName?: string,
    message: string
  }
  export type TValidationRules = IValidationRule[]
}

export {};
