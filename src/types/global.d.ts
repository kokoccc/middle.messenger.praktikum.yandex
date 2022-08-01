import { Block as BlockClass } from 'utils';

declare global {
  export type Block = BlockClass;
  export type Children = Record<string, Block>;
  export type Listeners = Record<string, EventListenerOrEventListenerObject>;
  export type Indexed<T = unknown> = { [key in string]: T; };
  export type Props = Record<string, unknown>;
  export type SubmitData = { [k: string]: FormDataEntryValue; };
  export type TObj = Record<string, unknown>;

  export interface Form {
    selector: string
    fields: Block[]
    button: Block
    submit: (formEl: HTMLFormElement) => void
  }

  export interface ValidationRule {
    regex: RegExp
    message: string
    negative?: boolean
  }
  export interface ValidationProps {
    parentClassName?: string
    rules: ValidationRule[]
  }

  export interface ControllerMethodParams {
    data?: SubmitData
    button?: Block
    file?: File
    formEl?: HTMLFormElement
    component?: Block
  }
}

export {};
