import { Block } from './Block';

export function renderDOM(parentSelector: string, block: Block) {
  block.render();

  const parentElement = document.querySelector(parentSelector) as HTMLElement;
  const childElement = block.getContent() as HTMLElement;

  parentElement.appendChild(childElement);
  block.dispatchComponentDidMount();

  return parentElement;
}
