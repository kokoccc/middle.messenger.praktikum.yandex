import { EventBus } from 'utils';
import { set } from 'helpers';

export enum StoreEvents {
  Updated = 'updated'
}

class Store extends EventBus {
  private _state: TIndexed = {};

  getState() {
    return this._state;
  }

  set(path: string, value: unknown) {
    set(this._state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store();
