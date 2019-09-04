import { bm as bookmarks } from "./bookmarks";
import { dbm as storage } from "./storage";

export function createTrackedBookmark({ title, url, regExp }, done) {
  bookmarks.create({ title, url }, (errMsg, newBookmark) => {
    if (errMsg) {
      return done(errMsg);
    }
    storage.create({ id: newBookmark.id, regExp, history: [] }, done);
  });
}
