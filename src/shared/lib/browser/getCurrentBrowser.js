///<reference path="./chrome.intellisense.js"/>

/**
 * @returns {chrome} Current browser API object (ex. `chrome` for google chrome or `browser` for mozilla firefox)
 */
export default function getCurrentBrowser() {
  if (chrome) {
    return chrome;
  }
  if (browser) {
    return browser;
  }
  throw "This exception does not support your browser";
}
