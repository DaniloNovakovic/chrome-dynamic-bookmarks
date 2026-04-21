async function sendRuntimeMessage(page, request, timeoutMs = 5000) {
  return page.evaluate(
    ({ request, timeoutMs }) =>
      new Promise((resolve) => {
        const timer = setTimeout(() => {
          resolve({
            type: "error",
            message: `Timed out waiting for runtime response after ${timeoutMs}ms`,
          });
        }, timeoutMs);

        chrome.runtime.sendMessage(request, (response) => {
          clearTimeout(timer);
          resolve(response || null);
        });
      }),
    { request, timeoutMs }
  );
}

async function createTrackedBookmark(
  page,
  { title, url, regExp, history = [] }
) {
  return page.evaluate(
    async ({ title, url, regExp, history }) => {
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
          const existingIds = result.dbm_ids || [];
          const nextIds = existingIds.includes(key)
            ? existingIds
            : [...existingIds, key];

          chrome.storage.local.set(
            {
              dbm_ids: nextIds,
              [key]: { regExp, history },
            },
            resolve
          );
        });
      });

      return bookmark.id;
    },
    { title, url, regExp, history }
  );
}

async function getBookmarkById(page, bookmarkId) {
  return page.evaluate(
    async ({ bookmarkId }) => {
      const node = await new Promise((resolve) => {
        chrome.bookmarks.get(bookmarkId, (nodes) => resolve(nodes[0] || null));
      });
      return node;
    },
    { bookmarkId }
  );
}

async function getStorageValues(page, keys) {
  return page.evaluate(
    async ({ keys }) => {
      return new Promise((resolve) => {
        chrome.storage.local.get(keys, resolve);
      });
    },
    { keys }
  );
}

async function searchBookmarks(page, query) {
  return page.evaluate(
    async ({ query }) => {
      return new Promise((resolve) => {
        chrome.bookmarks.search(query, resolve);
      });
    },
    { query }
  );
}

async function triggerTabUrlUpdate(page, targetUrl) {
  return page.evaluate(
    async ({ targetUrl }) => {
      const tab = await new Promise((resolve, reject) => {
        chrome.tabs.create({ url: "https://example.com" }, (createdTab) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(createdTab);
          }
        });
      });

      await new Promise((resolve, reject) => {
        chrome.tabs.update(tab.id, { url: targetUrl }, () => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(null);
          }
        });
      });
    },
    { targetUrl }
  );
}

module.exports = {
  sendRuntimeMessage,
  createTrackedBookmark,
  getBookmarkById,
  getStorageValues,
  searchBookmarks,
  triggerTabUrlUpdate,
};
