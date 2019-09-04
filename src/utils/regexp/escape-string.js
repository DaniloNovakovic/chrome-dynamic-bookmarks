/**
 * Converts `\ ^ $ * + ? . ( ) | { } [ ]` characters
 * into `\\ \^ \$ \* \+ \? \. \( \) \| \{ \} \[ \] `
 * @param {string} regExpString - string to escape
 */
export default function escapeRegExp(regExpString) {
  return regExpString.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
