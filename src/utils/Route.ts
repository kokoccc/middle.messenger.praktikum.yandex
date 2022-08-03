import { Block, renderDOM } from 'utils';
import { isEqual } from 'helpers';

interface IRouteConstructorParams extends IRouteParams {
  props: TIndexed
}

export class Route {
  private _pathname: string;
  private _blockClass: TypeofBlock;
  private _layoutClass: TypeofBlock | null = null;
  private _block: Block | null;
  private _props: Props;
  private _access: string;

  constructor({
    route, view, layout, access = 'all', props,
  }: IRouteConstructorParams) {
    this._pathname = route;
    this._blockClass = view;

    if (layout) {
      this._layoutClass = layout;
    }

    this._block = null;
    this._props = props;
    this._access = access;
  }

  get access() {
    return this._access;
  }

  leave() {
    if (this._block) {
      this._block.getContent().remove();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  render(replaceContent = false) {
    const query = this._props.rootQuery as string;

    if (this._layoutClass) {
      this._block = new this._layoutClass({
        content: new this._blockClass(),
      });
    } else {
      this._block = new this._blockClass();
    }

    renderDOM(query, this._block, replaceContent);
  }
}
