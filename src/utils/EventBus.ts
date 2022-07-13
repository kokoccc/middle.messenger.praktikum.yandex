type Listener = (...args: unknown[]) => void;

export class EventBus {
  private listeners: Record<string, Listener[]> = {};

  on(event: string, callback: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Listener): void {
    if (!this.listeners[event]) {
      throw new Error(`Event does not exist: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, data?: unknown): void {
    if (!this.listeners[event]) {
      throw new Error(`Event does not exist: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(data);
    });
  }
}
