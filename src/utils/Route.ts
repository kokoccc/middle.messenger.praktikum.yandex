import { Block, renderDOM } from 'utils';
import { isEqual } from 'helpers';

export class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _props: Props;

  constructor(pathname: string, view: typeof Block, props: Props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  leave() {
    if (this._block) {
      this._block.hide();
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

  render() {
    if (this._block) {
      this._block.show();
      return;
    }

    const query = this._props.rootQuery as string;

    this._block = new this._blockClass();
    renderDOM(query, this._block);
  }
}
