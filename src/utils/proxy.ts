export const createProxy = ((obj: Record<string, unknown>) => new Proxy(obj, {
  get(target: Record<string, unknown>, propName: string): unknown {
    if (propName.startsWith('_')) {
      throw new Error('Cannot get private property value');
    }

    const value = target[propName];

    return typeof value === 'function' ? value.bind(target) : value;
  },

  set(target: Record<string, unknown>, propName: string, value: unknown): boolean {
    if (propName.startsWith('_')) {
      throw new Error('Cannot set private property value');
    }

    target[propName] = value;

    return true;
  },

  deleteProperty() {
    throw new Error('Cannot delete a property');
  },
}));
