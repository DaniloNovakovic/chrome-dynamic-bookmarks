import { getCurrentBrowser } from "shared/lib/browser";
import createRouter from "./createRouter";
import registerRoutes from "./registerRoutes";

const browser = getCurrentBrowser();

export default function addMessageListeners() {
  const router = createRouter();
  registerRoutes(router);

  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.group("runtime.onMessage");
    console.log("request", request);
    console.log("sender", sender);
    console.groupEnd();

    router.handleRequest(request, sendResponse);
    return true;
  });
}
