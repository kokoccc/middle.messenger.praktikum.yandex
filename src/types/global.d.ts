declare global {
  export type Props = Record<string, unknown>
  export type Listeners = Record<string, () => unknown>
}

export {};
