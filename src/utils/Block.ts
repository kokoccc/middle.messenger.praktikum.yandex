import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { EventBus } from './EventBus';

const enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export class Block {
  private _element: HTMLElement = document.createElement('div');

  id = '';
  props: Props = {};
  children: Children = {};
  eventBus: () => EventBus;

  constructor(propsAndChildren = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildren(propsAndChildren);

    this.id = nanoid(10);
    this.props = this._makePropsProxy({ ...props, id: this.id });
    this.children = children as Children;
    this.eventBus = () => eventBus;

    this._registerEvents();
    this.eventBus().emit(EVENTS.INIT);
  }

  private _getChildren(propsAndChildren: Props) {
    const children: Props = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _makePropsProxy = (props: Props): Props => new Proxy(props, {
    get: (target: Record<string, unknown>, propName: string): unknown => {
      if (propName.startsWith('_')) {
        throw new Error(`Cannot get private property value: ${propName}`);
      }

      const value = target[propName];
      return typeof value === 'function' ? value.bind(target) : value;
    },

    set: (target: Record<string, unknown>, propName: string, value: unknown): boolean => {
      if (propName.startsWith('_')) {
        throw new Error('Cannot set private property value');
      }

      const oldProps = { ...target, propName };
      target[propName] = value;
      this.eventBus().emit(EVENTS.FLOW_CDU, oldProps, target);
      return true;
    },

    deleteProperty() {
      throw new Error('Cannot delete a property');
    },
  });

  private _registerEvents(): void {
    this.eventBus().on(EVENTS.INIT, this.init.bind(this));
    this.eventBus().on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus().on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus().on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _render() {
    const fragment = this.render();
    const element = fragment.firstElementChild as HTMLElement;

    this._removeEvents();

    this._element.innerHTML = '';
    this._element.replaceWith(element);
    this._element = element;

    this._addEvents();
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((childBlock: Block) => {
      childBlock.dispatchComponentDidMount();
    });
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      // this.eventBus().emit(EVENTS.FLOW_RENDER);
      this._render();
    }
  }

  private _addEvents() {
    const { events = {} } = this.props as Record<string, Listeners>;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props as Record<string, Listeners>;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  init() {
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  componentDidMount() {}

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return { oldProps, newProps };
  }

  render(): DocumentFragment {
    return document.createDocumentFragment();
  }

  compile(template: string, props: Props = {}): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const templateElement = document.createElement('template');
    const compiledBlock = Handlebars.compile(template);

    templateElement.innerHTML = compiledBlock(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = templateElement.content.querySelector(`[data-id="${child.id}"]`) as HTMLElement;

      const content = child.getContent().cloneNode(true);
      stub.replaceWith(content);
    });

    return templateElement.content;
  }

  getContent(): HTMLElement {
    return this._element;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    // this.eventBus().emit(EVENTS.FLOW_CDU, this.props);
  };
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
