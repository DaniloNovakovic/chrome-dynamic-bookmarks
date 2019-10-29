import { getCurrentBrowser } from "shared/lib/browser";

const browser = getCurrentBrowser();

export default function addConnectListeners(observable) {
  browser.runtime.onConnect.addListener(port => {
    const key = getKeyFromPort(port);
    console.log("subscribing", key);
    observable.subscribe(key, event => port.postMessage(event));

    port.onDisconnect.addListener(p => {
      console.log("unsubscribing", p);
      observable.unsubscribe(key);
    });
  });

  function getKeyFromPort(port) {
    console.log(port);
    const sender = port.sender;
    return `${sender.id}-${sender.url}-${sender.tlsChannelId}`;
  }
}
