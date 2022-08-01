import { Block } from './Block';

export function renderDOM(parentSelector: string, block: Block, replaceContent = false) {
  const parentElement = document.querySelector(parentSelector) as HTMLElement;
  const childElement = block.getContent() as HTMLElement;

  if (replaceContent) {
    parentElement.textContent = '';
  }

  parentElement.appendChild(childElement);
  block.dispatchComponentDidMount();

  return parentElement;
}
