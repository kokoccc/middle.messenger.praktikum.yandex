import { Block } from '.';

export class Layout extends Block {
  private _template = '';

  constructor({ props = {}, listeners = {} }, template: string, childTemplate = '') {
    super({ props, listeners });

    this._template = template.replace('{{ content }}', childTemplate);
    this._handleProps();
  }

  private _handleProps() {
    Object.entries(this.props).forEach(([prop, value]) => {
      this._template = this._template.replace(`{{${prop}}}`, value as string);
    });
  }

  render() {
    return this.compile(this._template);
  }
}
