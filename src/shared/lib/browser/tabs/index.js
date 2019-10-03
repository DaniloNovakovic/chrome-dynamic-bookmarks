import { checkAndHandleError } from "shared/lib/browser/log";
import getCurrentBrowser from "../getCurrentBrowser";

const browser = getCurrentBrowser();
const tabs = browser.tabs;

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
