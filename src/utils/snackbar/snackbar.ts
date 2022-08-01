import './snackbar.pcss';

const SNACKBAR_TIMEOUT = 5000;

class Snackbar {
  private _timeout: ReturnType<typeof setTimeout> | null = null;

  show(text: string, type = 'success') {
    this.destroy();

    const snackbar = document.createElement('div');
    const typeBackgroundClassName = type === 'success' ? 'bg-blue' : 'bg-red';

    snackbar.classList.add(...['snackbar', `snackbar--${type}`, 'fixed', 'z-snackbar',
      'px-4', 'py-3', 'text-body-medium', typeBackgroundClassName, 'white', 'shadow-sheet']);
    snackbar.textContent = text;

    document.body.appendChild(snackbar);
    snackbar.addEventListener('click', this.destroy);

    this._timeout = setTimeout(this.destroy, SNACKBAR_TIMEOUT);
  }

  showError = (errorData = '{}') => {
    const unknownErrorText = 'Произошла неизвестная ошибка';

    try {
      const text = JSON.parse(errorData).reason || unknownErrorText;
      this.show(text, 'error');
    } catch (error) {
      this.show(unknownErrorText, 'error');
    }
  };

  destroy() {
    const snackbar = document.querySelector('.snackbar');
    snackbar?.remove();

    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }
}

export const snackbar = new Snackbar();
