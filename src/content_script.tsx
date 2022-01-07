import { observeDOMChange } from "./lib/observe";
import { isRussianDocument } from "./lib/russian";
import { isHTMLElement, isTextNode } from "./lib/node";
import {
  applyStylesToRussianCharacters,
  replaceRussianTextNode,
  replaceRussianTextNodesUnderElement,
} from "./services/russianFormatter";

const observeConfig: MutationObserverInit = {
  childList: true,
  characterData: true,
  subtree: true,
};

function main() {
  if (isRussianDocument()) {
    return;
  }

  const rootElement = document.body || document.documentElement;

  if (!rootElement) {
    return;
  }

  applyStylesToRussianCharacters();
  replaceRussianTextNodesUnderElement(rootElement);

  observeDOMChange(
    rootElement,
    (mutations, observer) => {
      observer.disconnect();

      mutations.forEach((mutation) => {
        switch (mutation.type) {
          case "characterData":
            if (isTextNode(mutation.target)) {
              return replaceRussianTextNode(mutation.target);
            }
          case "childList":
            if (mutation.addedNodes?.length) {
              mutation.addedNodes.forEach((node) => {
                if (isTextNode(node)) {
                  return replaceRussianTextNode(node);
                }
                if (isHTMLElement(node)) {
                  return replaceRussianTextNodesUnderElement(node);
                }
              });
            }
        }
      });

      observer.observe(rootElement, observeConfig);
    },
    observeConfig
  );
}

main();
