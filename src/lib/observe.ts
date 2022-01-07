export const observeDOMChange = (
  target: HTMLElement,
  callback: (
    mutationList: MutationRecord[],
    observer: MutationObserver
  ) => void,
  observeConfig: MutationObserverInit
) => {
  const observer = new MutationObserver(callback);

  observer.observe(target, observeConfig);
};
