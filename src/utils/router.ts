import {
  Block,
  preloader,
  Route,
  store,
} from 'utils';
import { authController } from 'controllers';

const APP_SELECTOR = '#app';

class Router {
  private _currentRoute: Route | null = null;
  private _rootQuery = '';

  routes: Array<Route> = [];
  history: History = window.history;

  constructor(rootQuery: string) {
    this._currentRoute = null;
    this._rootQuery = rootQuery;
  }

  private async _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    const redirectPath = await this._getRedirectPath(route);

    if (redirectPath) {
      this.go(redirectPath);
      return;
    }

    this._currentRoute = route;
    route.render(true);

    preloader.hide();
  }

  private _addRoute(pathname: string, block: typeof Block, access: string) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery }, access);
    this.routes.push(route);
  }

  private _findRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  private async _getRedirectPath(route: Route): Promise<string | null> {
    let isAuthorized = store.getState().user;

    if (isAuthorized === undefined) {
      isAuthorized = await authController.checkAuth();
    }

    if (!isAuthorized && route?.access === 'auth') {
      return '/login';
    }

    if (isAuthorized && route?.access === 'unauth') {
      return '/messenger';
    }

    return null;
  }

  use(pathname: string | string[], block: typeof Block, status = 'all'): Router {
    if (Array.isArray(pathname)) {
      pathname.forEach((item) => this._addRoute(item, block, status));
    } else {
      this._addRoute(pathname, block, status);
    }

    return this;
  }

  start() {
    window.addEventListener('popstate', (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      const { pathname } = target.location as Location;

      this._onRoute(pathname);
    });

    document.addEventListener('click', (event: Event) => {
      const element = event.target as HTMLElement;
      const linkElement = element.closest('a');

      if (linkElement) {
        event.preventDefault();

        const href = linkElement.getAttribute('href') as string;
        this.go(href);
      }
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

export const router = new Router(APP_SELECTOR);
