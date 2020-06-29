import { getCurrentBrowser, logInfo } from "shared/lib/browser";

const browser = getCurrentBrowser();

export default function addConnectListeners(observable) {
  browser.runtime.onConnect.addListener((port) => {
    const key = getKeyFromPort(port);
    logInfo(`subscribing: ${key}`);
    observable.subscribe(key, (event) => port.postMessage(event));

    port.onDisconnect.addListener((p) => {
      logInfo("unsubscribing", p);
      observable.unsubscribe(key);
    });
  });

  function getKeyFromPort(port) {
    logInfo(port);
    const sender = port.sender;
    return `${sender.id}-${sender.url}-${sender.tlsChannelId}`;
  }
}
