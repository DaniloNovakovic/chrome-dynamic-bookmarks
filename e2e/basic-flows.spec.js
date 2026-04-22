const fs = require("fs");

const { test, expect } = require("@playwright/test");

const {
  launchExtensionContext,
  openExtensionPage,
} = require("./helpers/extension");

test.describe.configure({ mode: "serial" });

test.describe("dynamic bookmarks extension", () => {
  let context;
  let extensionId;
  let userDataDir;

  test.beforeAll(async () => {
    const launched = await launchExtensionContext();
    context = launched.context;
    extensionId = launched.extensionId;
    userDataDir = launched.userDataDir;
  });

  test.afterAll(async () => {
    await context.close();
    fs.rmSync(userDataDir, { recursive: true, force: true });
  });

  test("popup renders form with generated initial values", async () => {
    const popup = await openExtensionPage(context, extensionId, "popup.html");
    const titleInput = popup.locator("input[name='title']");
    const urlInput = popup.locator("input[name='url']");
    const regExpInput = popup.locator("input[name='regExp']");

    await expect(titleInput).toBeVisible();
    await expect(urlInput).toBeVisible();
    await expect(regExpInput).toBeVisible();
    await expect(titleInput).not.toHaveValue("");
    await expect(urlInput).not.toHaveValue("");
    await expect(regExpInput).not.toHaveValue("");
    await popup.close();
  });

  test("tracked bookmark metadata can be created and retrieved", async () => {
    const testId = Date.now();
    const title = `e2e-popup-create-${testId}`;
    const url = `https://example.com/e2e-created-${testId}`;
    const regExp = `example\\.com/e2e-created-${testId}`;
    const extensionPage = await openExtensionPage(
      context,
      extensionId,
      "options.html"
    );

    await extensionPage.evaluate(
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
            const existingIds = result.dbm_ids || [];
            const nextIds = existingIds.includes(key)
              ? existingIds
              : [...existingIds, key];

            chrome.storage.local.set(
              {
                dbm_ids: nextIds,
                [key]: { regExp, history: [] },
              },
              resolve
            );
          });
        });
      },
      { title, url, regExp }
    );

    const getCreatedData = async () => {
      return extensionPage.evaluate(
        async ({ title }) => {
          const nodes = await new Promise((resolve) => {
            chrome.bookmarks.search({ title }, resolve);
          });
          const bookmark = nodes.find(
            (node) => node.title === title && node.url
          );

          if (!bookmark) {
            return { found: false };
          }

          const key = `dbm_${bookmark.id}`;
          const storage = await new Promise((resolve) => {
            chrome.storage.local.get(["dbm_ids", key], resolve);
          });

          return {
            found: true,
            bookmarkId: bookmark.id,
            bookmarkUrl: bookmark.url,
            dbmIds: storage.dbm_ids || [],
            dbmItem: storage[key] || null,
          };
        },
        { title }
      );
    };

    await expect.poll(async () => (await getCreatedData()).found).toBe(true);
    const created = await getCreatedData();

    expect(created).toMatchObject({
      found: true,
      bookmarkUrl: url,
      dbmItem: { regExp, history: [] },
    });
    expect(created.dbmIds).toContain(`dbm_${created.bookmarkId}`);
    await extensionPage.close();
  });

  test("popup rejects invalid regular expressions", async () => {
    const popup = await openExtensionPage(context, extensionId, "popup.html");
    await popup.locator("input[name='regExp']").fill("[");
    await popup.getByRole("button", { name: /submit/i }).click();

    await expect(popup.getByText("Invalid regular expression")).toBeVisible();
    await popup.close();
  });

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

  test("tab URL updates tracked bookmark", async () => {
    const testId = Date.now();
    const title = `e2e-tab-update-${testId}`;
    const initialUrl = `https://example.com/initial-${testId}`;
    const targetUrl = `https://example.com/e2e-updated-${testId}`;
    const regExp = `example\\.com/e2e-updated-${testId}`;
    const extensionPage = await openExtensionPage(
      context,
      extensionId,
      "options.html"
    );
    await createTrackedBookmark(extensionPage, {
      title,
      url: initialUrl,
      regExp,
    });

    const browsingPage = await context.newPage();
    await browsingPage.goto(targetUrl);
    await browsingPage.close();

    await expect
      .poll(
        async () => (await getBookmarkState(extensionPage, title)).bookmark?.url
      )
      .toBe(targetUrl);
    await extensionPage.close();
  });

  test("edit request can untrack bookmark metadata", async () => {
    const testId = Date.now();
    const title = `e2e-edit-untrack-${testId}`;
    const extensionPage = await openExtensionPage(
      context,
      extensionId,
      "options.html"
    );
    const created = await createTrackedBookmark(extensionPage, {
      title,
      url: `https://example.com/edit-${testId}`,
      regExp: "example\\.com",
    });

    await sendRuntimeMessage(extensionPage, "EDIT_BM_NODE", {
      id: created.id,
      title,
      url: `https://example.com/edit-${testId}`,
      regExp: "",
    });

    await expect
      .poll(async () => (await getBookmarkState(extensionPage, title)).dbmItem)
      .toBeNull();
    await extensionPage.close();
  });

  test("remove request deletes bookmark and storage metadata", async () => {
    const testId = Date.now();
    const title = `e2e-remove-${testId}`;
    const extensionPage = await openExtensionPage(
      context,
      extensionId,
      "options.html"
    );
    const created = await createTrackedBookmark(extensionPage, {
      title,
      url: `https://example.com/remove-${testId}`,
      regExp: "example\\.com",
    });

    await sendRuntimeMessage(extensionPage, "REMOVE_BM_NODE", {
      id: created.id,
    });

    await expect
      .poll(async () => (await getBookmarkState(extensionPage, title)).found)
      .toBe(false);
    const key = `dbm_${created.id}`;
    const storage = await extensionPage.evaluate(
      async ({ key }) => {
        return new Promise((resolve) =>
          chrome.storage.local.get(["dbm_ids", key], resolve)
        );
      },
      { key }
    );
    expect(storage.dbm_ids || []).not.toContain(key);
    expect(storage[key]).toBeUndefined();
    await extensionPage.close();
  });

  test("move and copy requests preserve key bookmark operations", async () => {
    const testId = Date.now();
    const extensionPage = await openExtensionPage(
      context,
      extensionId,
      "options.html"
    );
    const setup = await extensionPage.evaluate(
      async ({ testId }) => {
        const sourceFolder = await new Promise((resolve) =>
          chrome.bookmarks.create({ title: `source-${testId}` }, resolve)
        );
        const destinationFolder = await new Promise((resolve) =>
          chrome.bookmarks.create({ title: `destination-${testId}` }, resolve)
        );
        const bookmark = await new Promise((resolve) =>
          chrome.bookmarks.create(
            {
              title: `movable-${testId}`,
              url: `https://example.com/movable-${testId}`,
              parentId: sourceFolder.id,
            },
            resolve
          )
        );
        return { sourceFolder, destinationFolder, bookmark };
      },
      { testId }
    );

    await sendRuntimeMessage(extensionPage, "MOVE_BM_NODE", {
      id: setup.bookmark.id,
      destination: { parentId: setup.destinationFolder.id, index: 0 },
    });

    const moved = await extensionPage.evaluate(
      async ({ id }) => {
        return new Promise((resolve) =>
          chrome.bookmarks.get(id, (nodes) => resolve(nodes[0]))
        );
      },
      { id: setup.bookmark.id }
    );
    expect(moved.parentId).toBe(setup.destinationFolder.id);

    await sendRuntimeMessage(extensionPage, "COPY_BM_NODE", {
      id: setup.bookmark.id,
      destination: { parentId: setup.sourceFolder.id, index: 0 },
    });

    const copiedCount = await extensionPage.evaluate(
      async ({ title }) => {
        const nodes = await new Promise((resolve) =>
          chrome.bookmarks.search({ title }, resolve)
        );
        return nodes.filter((node) => !!node.url).length;
      },
      { title: setup.bookmark.title }
    );
    expect(copiedCount).toBeGreaterThan(1);
    await extensionPage.close();
  });

  test("tracked bookmark history is capped to 10 entries", async () => {
    const testId = Date.now();
    const title = `e2e-history-${testId}`;
    const extensionPage = await openExtensionPage(
      context,
      extensionId,
      "options.html"
    );
    const created = await createTrackedBookmark(extensionPage, {
      title,
      url: `https://example.com/history-start-${testId}`,
      regExp: "example\\.com",
    });

    await extensionPage.evaluate(
      async ({ id, testId }) => {
        for (let i = 0; i < 12; i += 1) {
          const url = `https://example.com/history-${testId}-${i}`;
          await new Promise((resolve, reject) => {
            chrome.bookmarks.update(id, { url }, () => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                resolve();
              }
            });
          });
          await new Promise((resolve) => setTimeout(resolve, 25));
        }
      },
      { id: created.id, testId }
    );

    await expect
      .poll(
        async () =>
          (
            await getBookmarkState(extensionPage, title)
          ).dbmItem?.history?.length
      )
      .toBe(10);
    await extensionPage.close();
  });
});
