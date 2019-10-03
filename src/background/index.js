import { getCurrentBrowser, migrateStorage } from "shared/lib/browser";
import addTabsListeners from "./addTabsListeners";
import addBookmarkListeners from "./addBookmarkListeners";
import createObservable from "./createObservable";

const browser = getCurrentBrowser();
const observable = createObservable();

observable.subscribe("logger", event => console.log(event));

browser.runtime.onInstalled.addListener(({ reason = "update" }) => {
  if (reason === "update") {
    migrateStorage();
  }
});

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

addBookmarkListeners(event => observable.notify(event));
addTabsListeners();
