import { compile } from 'handlebars';
import { EventBus } from './EventBus';
import { createProxy } from './proxy';

const enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export class Block {
  eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  private _listeners: Listeners = {};

  props: Props = {};

  constructor({ props = {}, listeners = {} }) {
    const eventBus = new EventBus();

    this.props = createProxy(props);
    this.eventBus = () => eventBus;
    Object.assign(this._listeners, listeners);

    this._registerEvents();
    this.eventBus().emit(EVENTS.INIT);
  }

  private _registerEvents(): void {
    this.eventBus().on(EVENTS.INIT, this.init.bind(this));
    // this.eventBus().on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    // this.eventBus().on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus().on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _render(): void {
    this.compile();
  }

  init() {}

  render(): unknown {
    return this.compile();
  }

  compile(template = '', props: Props = {}): Block {
    const templateElement = document.createElement('template');
    const compiledBlock = compile(template);

    templateElement.innerHTML = compiledBlock({
      ...this.props, props,
    }).trim();

    this._element = templateElement.content.firstChild as HTMLElement;

    return this;
  }

  getContent(): HTMLElement | null {
    return this._element;
  }
}

// export class Block {
//   eventBus: () => EventBus;

//   private _element: HTMLElement | null = null;

//   private _listeners: Listeners = {};

//   props: Props = {};

//   constructor({ props = {}, listeners = {} }) {
//     const eventBus = new EventBus();

//     Object.assign(this._listeners, listeners);

//     this.props = createProxy(props);
//     this.eventBus = () => eventBus;
//     this._registerEvents();

//     eventBus.emit(EVENTS.INIT);
//   }

//   get element(): HTMLElement | null {
//     return this._element;
//   }

//   private _registerEvents(): void {
//     this.eventBus().on(EVENTS.INIT, this.init.bind(this));
//     this.eventBus().on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
//     // this.eventBus().on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
//     this.eventBus().on(EVENTS.FLOW_RENDER, this._render.bind(this));
//   }

//   private _createResources(): void {
//     const { tagName } = this._meta;
//     this._element = this._createDocumentElement(tagName as string);
//   }

//   private _createDocumentElement(tagName: string): HTMLElement {
//     return document.createElement(tagName);
//   }

//   private _componentDidMount(): void {
//     this._addEventListeners();
//     this.componentDidMount();
//   }

//   private _addEventListeners(): void {
//     if (!this._element) {
//       return;
//     }

//     const children = Array.from(this._element.getElementsByTagName('*')) as HTMLElement[];
//     const allElements = [this._element].concat(children);

//     allElements.forEach((child) => {
//       const element = child as HTMLElement;
//       const attributeNames = element.getAttributeNames() as string[];

//       attributeNames.forEach((attrName): void => {
//         if (!attrName.startsWith('@')) {
//           return;
//         }

//         const callbackName = element.getAttribute(attrName);
//         element.removeAttribute(attrName);

//         if (callbackName && this._listeners[callbackName]) {
//           element.addEventListener(attrName.slice(1), this._listeners[callbackName]);
//         }
//       });
//     });
//   }

//   /* private _componentDidUpdate({ oldProps, newProps }: Props): void {
//     const response = this.componentDidUpdate({ oldProps, newProps });

//     if (response) {
//       this.eventBus().emit(EVENTS.FLOW_RENDER,);
//     }
//   } */

//   private _render(): void {
//     const block = this.render();
//     const compiledBlock = Handlebars.compile(block);
//     const template = document.createElement('template');

//     template.innerHTML = compiledBlock({
//       ...this.props,
//     }).trim();

//     this._element = template.content.firstChild as HTMLElement;
//   }

//   init(): void {
//     this._createResources();
//     this.eventBus().emit(EVENTS.FLOW_RENDER);
//   }

//   setProps = (newProps: Props): void => {
//     const oldProps = { ...this.props };
//     Object.assign(this.props, newProps);
//     this.eventBus().emit(EVENTS.FLOW_CDU, { newProps, oldProps });
//   };

//   /* componentDidUpdate({ oldProps: props, newProps: props }) {
//     console.log(oldProps, newProps);
//     return true;
//   } */

//   render(): unknown {
//     return '';
//   }

//   compile(template: string, props: Props = {}) {
//     const compiled = Handlebars.compile(template, props);
//     const templateElement = document.createElement('template');

//     templateElement.innerHTML = compiled({
//       ...this.props,
//     }).trim();

//     this._element = templateElement.content.firstChild as HTMLElement;
//   }

//   getContent(): HTMLElement | null {
//     return this.element;
//   }

//   dispatchComponentDidMount() {
//     this.eventBus().emit(EVENTS.FLOW_CDM);
//   }

//   componentDidMount(): void {}
// }
