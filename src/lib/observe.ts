export const observeConfig = {attributes: true, childList: true, subtree: true};

export const observeDOMChange = (
  target: HTMLElement,
  callback: (mutationList: MutationRecord[], observer: MutationObserver) => void
) => {
  const observer = new MutationObserver(callback);

  observer.observe(target, observeConfig);
};
