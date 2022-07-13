import './login.pcss';
import { Block } from 'utils';

const template = `
<main class="relative flex-full flex justify-center align-center px-4 py-2">
</main>
`;

export class Login extends Block {
  constructor(props: Record<string, unknown> = {}) {
    super('div', { props });
  }

  render(): string {
    return template;
  }
}
