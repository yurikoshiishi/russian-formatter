import { hasRussianCharacter } from "../lib/russian";
import { findTextNodesUnderElement } from "../lib/node";

const RUSSIAN_STYLES_ID = "russian-formatter-styles";
const RUSSIAN_TEXT_CLASSNAME = "russian-formatter__has-russian";

export function applyStylesToRussianCharacters() {
  if (document.getElementById(RUSSIAN_STYLES_ID)) {
    return;
  }
  const styles = document.createElement("style");
  styles.id = RUSSIAN_STYLES_ID;
  styles.innerHTML = `
        *::placeholder,
        .${RUSSIAN_TEXT_CLASSNAME} {
            font-family: system-ui, monospace, sans-serif;
        }
    `;
  document.head.appendChild(styles);
}

export function replaceRussianTextNodesUnderElement(rootElement: HTMLElement) {
  const textNodes = findTextNodesUnderElement(rootElement);
  textNodes.forEach(replaceRussianTextNode);
}

export function replaceRussianTextNode(node: Text) {
  if (node.parentElement?.classList.contains(RUSSIAN_TEXT_CLASSNAME)) {
    return;
  }
  const text = node.textContent;

  if (!text) {
    return;
  }

  const hasRussian = hasRussianCharacter(text);
  if (!hasRussian) {
    return;
  }

  const replacedTextHTML = `<span class="${RUSSIAN_TEXT_CLASSNAME}">${text}</span>`;

  const newNode = document.createElement("span");
  newNode.innerHTML = replacedTextHTML;
  node.replaceWith(newNode);
}
