import { checkAndHandleError } from "shared/lib/browser/log";
import getCurrentBrowser from "../getCurrentBrowser";

const browser = getCurrentBrowser();
const tabs = browser.tabs;
const windows = browser.windows;

/**
 * Returns currently opened tab info
 * @param {function} done - callback function called with `done(errMsg:string, currentTab:Tab)`
 */
export function getCurrentTab(done) {
  tabs.query({ active: true, currentWindow: true }, tabs => {
    if (!checkAndHandleError(done)) {
      const currentTab = tabs[0];
      done(null, currentTab);
    }
  });
}

export function openNewTab(url, done = null) {
  if (Array.isArray(url)) {
    url.forEach(currUrl => tabs.create({ url: currUrl }, done));
  } else {
    tabs.create({ url }, done);
  }
}

export function openNewWindow(url, done = null) {
  windows.create({ url }, done);
}

export function openNewIncognitoWindow(url, done = null) {
  windows.create({ url, incognito: true }, done);
}
