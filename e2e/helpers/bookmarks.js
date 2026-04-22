/**
 * Extension-page helpers for bookmark + dynamic metadata (E2E).
 * @param {import('@playwright/test').Page} page
 */

async function createTrackedBookmark(page, { title, url, regExp }) {
  return page.evaluate(
    async ({ title, url, regExp }) => {
      const bookmark = await new Promise((resolve, reject) => {
        chrome.bookmarks.create({ title, url }, (node) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(node);
          }
        });
      });

      const key = `dbm_${bookmark.id}`;
      await new Promise((resolve) => {
        chrome.storage.local.get(["dbm_ids"], (result) => {
          const ids = result.dbm_ids || [];
          chrome.storage.local.set(
            {
              dbm_ids: ids.includes(key) ? ids : [...ids, key],
              [key]: { regExp, history: [] },
            },
            resolve
          );
        });
      });
      return bookmark;
    },
    { title, url, regExp }
  );
}

async function getBookmarkState(page, title) {
  return page.evaluate(
    async ({ title }) => {
      const nodes = await new Promise((resolve) =>
        chrome.bookmarks.search({ title }, resolve)
      );
      const bookmark = nodes.find((node) => node.title === title && node.url);
      if (!bookmark) {
        return { found: false };
      }
      const key = `dbm_${bookmark.id}`;
      const storage = await new Promise((resolve) =>
        chrome.storage.local.get(["dbm_ids", key], resolve)
      );
      return {
        found: true,
        bookmark,
        dbmKey: key,
        dbmIds: storage.dbm_ids || [],
        dbmItem: storage[key] || null,
      };
    },
    { title }
  );
}

async function sendRuntimeMessage(page, type, data) {
  return page.evaluate(
    ({ type, data }) =>
      new Promise((resolve) =>
        chrome.runtime.sendMessage({ type, data }, resolve)
      ),
    { type, data }
  );
}

module.exports = {
  createTrackedBookmark,
  getBookmarkState,
  sendRuntimeMessage,
};
