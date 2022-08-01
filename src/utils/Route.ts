import { Block, renderDOM } from 'utils';
import { isEqual } from 'helpers';

export class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _props: Props;
  private _access: string;

  constructor(pathname: string, view: typeof Block, props: Props, access: string) {
    this._pathname = pathname;
    this._blockClass = view;
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

    this._block = new this._blockClass();

    renderDOM(query, this._block, replaceContent);
  }
}
