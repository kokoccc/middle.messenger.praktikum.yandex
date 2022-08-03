import { Block } from 'utils';
import { Button, TextField } from 'components';

declare global {
  // TYPES
  export type TIndexed<T = unknown> = { [key in string]: T; };

  // GENERAL
  export type TBlock = Block;
  export type TypeofBlock = typeof Block;

  // COMPONENTS
  export type TButton = Button;
  export type TTextField = TextField;

  // PROPS
  export type TEventsProp = Record<string, (event: Event) => unknown>
  export interface IProps extends TIndexed {
    events?: TEventsProp
  }

  // ROUTER
  export interface IRouteParams {
    route: string,
    view: TypeofBlock,
    layout?: TypeofBlock,
    access?: string
  }

  // FORMS
  export interface Form {
    selector: string
    fields: TBlock[]
    button: TBlock
    submit: (formEl: HTMLFormElement) => void
  }
  export type TFormData = { [k: string]: FormDataEntryValue; };

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
