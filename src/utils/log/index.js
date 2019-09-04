export function logError(errMsg) {
  if (errMsg) {
    console.error(errMsg);
  }
}
export function logWarn(msg) {
  if (msg) {
    console.warn(msg);
  }
}

/**
 * Checks if there is an error, if found calls callback function and returns `true` else `false`
 * @param {function} onErrorFound - callback to call if error was found
 */
export function checkAndHandleError(
  onErrorFound = errMsg => console.error(errMsg)
) {
  if (chrome.runtime.lastError) {
    onErrorFound(chrome.runtime.lastError.message);
    return true;
  }
  return false;
}
