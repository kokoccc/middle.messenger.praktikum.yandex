import './error.pcss';
import { Layout } from 'utils';

const sayHello = () => {
  // eslint-disable-next-line no-alert
  alert('hello!');
};

const template = `
<main class="relative flex-full flex justify-center align-center px-4 py-2">
  <section class="flex flex-column align-center">
    <h1 class="text-title-1">{{ title }}</h1>

    {{#if subtitle}}
    <h2 class="mt-2 text-title-3">{{ subtitle }}</h2>
    {{/if}}

    <a
      href="/"
      class="mt-6 mt-md-12 text-body-medium blue-dark"
      @click="sayHello"
    >
      Вернуться к списку чатов
    </a>
  </section>

  <img src="{{ image }}" class="page-error__image absolute z-negative center" alt="" />
</main>`;

const layoutListeners = { sayHello };

export class LayoutError extends Layout {
  constructor({ props = {}, listeners = {} }, pageTemplate = '') {
    super({
      props,
      listeners: { ...layoutListeners, ...listeners },
    }, template, pageTemplate);
  }
}
