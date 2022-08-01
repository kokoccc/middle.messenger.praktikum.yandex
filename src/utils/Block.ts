import { nanoid } from 'nanoid';
import {
  EventBus,
  validateField,
  validateForm,
  validateValueMatching,
} from 'utils';

type Listener = (arg0: Event) => unknown;
type Listeners = Record<string, Listener>

interface ListenerProps {
  events?: Listeners
  form?: Form
  validation?: ValidationProps
}

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
  listeners: Listeners = {};
  isValueChanged = false;
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
    this._toggleEventListeners(false);

    const fragment = this.render();
    const element = fragment.firstElementChild as HTMLElement;

    this._element.replaceWith(element);
    this._element = element;

    this._toggleEventListeners(true);
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
      this._render();
    }
  }

  private _toggleEventListeners(add: boolean) {
    const {
      form,
      events = {},
      validation,
    }: ListenerProps = this.props;

    const method = add ? 'addEventListener' : 'removeEventListener';

    Object.keys(events).forEach((eventName) => {
      this._element[method](eventName, events[eventName]);
    });

    if (form) {
      const formEl = (this._element.matches(form.selector)
        ? this._element
        : this._element.querySelector(form.selector)) as HTMLFormElement;

      if (!formEl) {
        return;
      }

      if (add) {
        this.listeners.onSubmit = (event: Event) => {
          event.preventDefault();

          const isValid = this.validate();

          if (isValid) {
            form.submit(formEl);
          }
        };
      }

      formEl[method]('submit', this.listeners.onSubmit);
    }

    if (validation) {
      if (add) {
        this.listeners.onBlur = () => this.validate();
        this.listeners.onFocus = () => this.validate();
      }

      const inputElements = this._element.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

      inputElements.forEach((inputEl) => {
        inputEl[method]('blur', this.listeners.onBlur);
        inputEl[method]('focus', this.listeners.onFocus);
      });
    }
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

  compile(template: (arg0: unknown) => unknown, props: Props = {}): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const templateElement = document.createElement('template');
    templateElement.innerHTML = template(propsAndStubs) as string;

    Object.values(this.children).forEach((child) => {
      const stub = templateElement.content.querySelector(`[data-id="${child.id}"]`) as HTMLElement;
      stub.replaceWith(child.getContent());
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
  };

  show() {
    this.getContent().classList.remove('d-none');
  }

  hide() {
    this.getContent().classList.add('d-none');
  }

  validate(): boolean {
    if (this.props.form) {
      return validateForm(this.props.form as Form);
    }

    if (this.props.validation) {
      const { matchingFieldName } = this.props.validation as Record<string, string>;

      return matchingFieldName
        ? validateValueMatching(this._element as HTMLInputElement, matchingFieldName)
        : validateField(this._element, this.props.validation as ValidationProps);
    }

    return true;
  }
}
