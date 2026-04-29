import { getCurrentBrowser } from "@/shared/lib/browser";

const browser = getCurrentBrowser();

type PortResponse = Record<string, unknown>;
type SendResponse = (response: PortResponse) => void;
type OnMessage = (message: PortResponse, sendResponse: SendResponse) => void;

function log(msg: PortResponse) {
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
export default function connectToBackground(onMessage: OnMessage = log) {
  const port = browser.runtime.connect({ name: "bookmarks" });

  function sendResponse(res: PortResponse) {
    port.postMessage(res);
  }

  port.onMessage.addListener((msg) => {
    onMessage(msg, sendResponse);
  });
}
