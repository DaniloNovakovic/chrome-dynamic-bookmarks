import "core-js/stable";
import "regenerator-runtime/runtime";
import addBookmarkListeners from "./addBookmarkListeners";
import addConnectListeners from "./addConnectListeners";
import addInstalledListeners from "./addInstalledListeners";
import addMessageListeners from "./addMessageListeners";
import addTabsListeners from "./addTabsListeners";
import createObservable from "./createObservable";
import { logInfo } from "shared/lib/browser";

const observable = createObservable();
observable.subscribe("logger", (event) => logInfo(event));

addInstalledListeners();
addTabsListeners();
addMessageListeners();
addConnectListeners(observable);
addBookmarkListeners((event) => observable.notify(event));
