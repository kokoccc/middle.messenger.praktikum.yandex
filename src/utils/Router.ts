import { Block, Route } from 'utils';

export class Router {
  private static __instance: Router;

  private _currentRoute: Route | null = null;
  private _rootQuery = '';

  routes: Array<Route> = [];
  history: History = window.history;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  private _addRoute(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
  }

  private _findRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  use(pathname: string | string[], block: typeof Block): Router {
    if (Array.isArray(pathname)) {
      pathname.forEach((item) => this._addRoute(item, block));
    } else {
      this._addRoute(pathname, block);
    }

    return this;
  }

  start() {
    window.addEventListener('popstate', (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      const { pathname } = target.location as Location;

      this._onRoute(pathname);
    });

    this._onRoute(window.location.pathname);
  }

  getRoute(pathname: string) {
    return this._findRoute(pathname) || this._findRoute('*');
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
}
