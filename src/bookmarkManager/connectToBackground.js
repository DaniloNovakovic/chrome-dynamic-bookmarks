import { getCurrentBrowser } from "shared/lib/browser";

const browser = getCurrentBrowser();

function log(msg) {
  console.log(msg);
}

/**
 * @callback onMessageCallback
 * @param {{type: string, data: any}} message
 * @param {function} sendResponse
 */

/**
 * Adds listeners for messages from background page, calls `onMessage` when a new message is received.
 * @param {onMessageCallback} onMessage - callback function called when message is received from background
 */
export default function connectToBackground(onMessage = log) {
  const port = browser.runtime.connect({ name: "bookmarks" });

  function sendResponse(res) {
    port.postMessage(res);
  }

  port.onMessage.addListener(msg => {
    onMessage(msg, sendResponse);
  });
}
