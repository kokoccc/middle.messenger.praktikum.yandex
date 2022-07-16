import { Block } from 'utils';

declare global {
  export type Props = Record<string, unknown>
  export type Children = Record<string, Block>
  export type Listeners = Record<string, EventListenerOrEventListenerObject>

  export interface ValidationRule {
    regex: RegExp
    message: string
    negative?: boolean
  }
  export interface ValidationProps {
    parentClassName?: string
    rules: ValidationRule[]
  }
}

export {};
