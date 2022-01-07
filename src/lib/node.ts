export function findTextNodesUnderElement(element: Element): Text[] {
  const textNodes: Text[] = [];

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);

  let node: Node | null = walker.currentNode;

  while (node) {
    if (isTextNode(node)) {
      textNodes.push(node);
    }

    node = walker.nextNode();
  }
  return textNodes;
}

export function isTextNode(node: Node): node is Text {
  return node.nodeName === '#text';
}

export function isHTMLElement(node: Node): node is HTMLElement {
  return node instanceof HTMLElement;
}
