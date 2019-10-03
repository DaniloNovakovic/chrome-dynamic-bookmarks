import getCurrentBrowser from "../getCurrentBrowser";

const browser = getCurrentBrowser();
const runtime = browser.runtime;

export function logInfo(msg) {
  console.log(msg);
}

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
export function checkAndHandleError(onErrorFound = logError) {
  if (runtime.lastError) {
    onErrorFound(runtime.lastError.message);
    return true;
  }
  return false;
}

export default {
  logError,
  logWarn,
  checkAndHandleError
};
