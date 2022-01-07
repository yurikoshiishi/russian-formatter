const CYRILLIC_REGEX = /[\u0400-\u04FF]/;

export function hasRussianCharacter(text: string) {
  return CYRILLIC_REGEX.test(text);
}

export function isRussianDocument() {
  const lang = document.documentElement.lang;

  return lang === "ru";
}
