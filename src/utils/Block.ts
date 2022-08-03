import Handlebars from 'handlebars';
import HandlebarsHelpers from 'just-handlebars-helpers';
import { nanoid } from 'nanoid';
import { EventBus } from 'utils';

type TChildren = Record<string, TBlock>;
type Listener = (arg0: Event) => unknown;
type Listeners = Record<string, Listener>

interface ListenerProps {
  events?: Listeners
}

const enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

HandlebarsHelpers.registerHelpers(Handlebars);

export class Block {
  private _element: HTMLElement = document.createElement('div');

  id = '';
  props: IProps = {};
  children: TChildren = {};
  listeners: Listeners = {};
  isValueChanged = false;
  eventBus: () => EventBus;

  constructor(propsAndChildren = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildren(propsAndChildren);

    this.id = nanoid(10);
    this.props = this._makePropsProxy({ ...props, id: this.id });
    this.children = children as TChildren;
    this.eventBus = () => eventBus;

    this._registerEvents();
    this.eventBus().emit(EVENTS.INIT);
  }

  private _getChildren(propsAndChildren: IProps) {
    const children: Record<string, Block> = {};
    const props: IProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      const isChildrenList = Array.isArray(value) && value.every((item) => item instanceof Block);

      if (value instanceof Block) {
        children[key] = value;
      } else if (isChildrenList) {
        value.forEach((child, index) => {
          children[`${key}_${index}`] = child;
          props[key] = value.map(this._getStubHTML);
        });
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _makePropsProxy = (props: IProps) => new Proxy(props, {
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
    this._toggleEventListeners(false);

    const fragment = this.render();
    let element = fragment.firstElementChild as HTMLElement;

    if (fragment.children.length > 1) {
      element = document.createElement('div');
      element.appendChild(fragment);
    }

    this._element.replaceWith(element);
    this._element = element;

    this._toggleEventListeners(true);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((childBlock: TBlock) => {
      childBlock.dispatchComponentDidMount();
    });
  }

  private _componentDidUpdate(oldProps: IProps, newProps: IProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this._render();
    }
  }

  private _toggleEventListeners(add: boolean) {
    const { events = {} }: ListenerProps = this.props;

    const method = add ? 'addEventListener' : 'removeEventListener';

    Object.keys(events).forEach((eventName) => {
      this._element[method](eventName, events[eventName]);
    });
  }

  private _getStubHTML(item: TBlock): string {
    return `<div data-id="${item.id}"></div>`;
  }

  init() {
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  componentDidMount() {}

  componentDidUpdate(oldProps: IProps, newProps: IProps) {
    return { oldProps, newProps };
  }

  render(): DocumentFragment {
    return document.createDocumentFragment();
  }

  compile(template: (arg0: unknown) => unknown, props: IProps = {}): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = this._getStubHTML(child);
    });

    const templateElement = document.createElement('template');
    templateElement.innerHTML = template(propsAndStubs) as string;

    Object.values(this.children).forEach((child) => {
      const stub = templateElement.content.querySelector(`[data-id="${child.id}"]`) as HTMLElement;
      child.setProps(props);
      stub.replaceWith(child.getContent());
    });

    return templateElement.content;
  }

  getContent(): HTMLElement {
    return this._element;
  }

  setProps = (nextProps: IProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  show() {
    this.getContent().classList.remove('d-none');
  }

  hide() {
    this.getContent().classList.add('d-none');
  }
}
