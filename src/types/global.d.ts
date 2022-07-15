import { Block } from 'utils';

declare global {
  export type Props = Record<string, unknown>
  export type Children = Record<string, Block>
  export type Listeners = Record<string, () => unknown>
}

export {};
