import { getCurrentBrowser } from "shared/lib/browser";

const browser = getCurrentBrowser();

export default function connectToBackground() {
  const port = browser.runtime.connect({ name: "bookmarks" });
  port.onMessage.addListener(msg => {
    console.log(msg);
  });
}
