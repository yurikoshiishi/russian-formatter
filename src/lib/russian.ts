const CYRILLIC_REGEX = /[\u0400-\u04FF]/;

export function hasRussianCharacter(text: string) {
  return CYRILLIC_REGEX.test(text);
}
