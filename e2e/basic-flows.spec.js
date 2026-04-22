const fs = require("fs");

const { test, expect } = require("@playwright/test");

const {
  createTrackedBookmark,
  getBookmarkState,
  sendRuntimeMessage,
} = require("./helpers/bookmarks");
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

  test("given popup when opened then form fields are prefilled", async () => {
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

  test("given tracked bookmark in storage when queried then metadata matches", async () => {
    const testId = Date.now();
    const title = `e2e-popup-create-${testId}`;
    const url = `https://example.com/e2e-created-${testId}`;
    const regExp = `example\\.com/e2e-created-${testId}`;
    const extensionPage = await openExtensionPage(
      context,
      extensionId,
      "options.html"
    );

    await createTrackedBookmark(extensionPage, { title, url, regExp });

    await expect
      .poll(async () => (await getBookmarkState(extensionPage, title)).found)
      .toBe(true);
    const created = await getBookmarkState(extensionPage, title);

    expect(created).toMatchObject({
      found: true,
      bookmark: expect.objectContaining({ url }),
      dbmItem: { regExp, history: [] },
    });
    expect(created.dbmIds).toContain(`dbm_${created.bookmark.id}`);
    await extensionPage.close();
  });

  test("given invalid regexp in popup when submit then validation error is shown", async () => {
    const popup = await openExtensionPage(context, extensionId, "popup.html");
    await popup.locator("input[name='regExp']").fill("[");
    await popup.getByRole("button", { name: /submit/i }).click();

    await expect(popup.getByText("Invalid regular expression")).toBeVisible();
    await popup.close();
  });

  test("given tracked bookmark when tab navigates to matching URL then bookmark URL updates", async () => {
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

  test("given tracked bookmark when edit clears regexp then storage metadata is removed", async () => {
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

  test("given tracked bookmark when remove request then bookmark and dbm keys are gone", async () => {
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

  test("given bookmark when move then copy then tree reflects new parent and duplicate title", async () => {
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

  test("given folder with tracked child when remove folder then descendant dbm metadata is cleared", async () => {
    const testId = Date.now();
    const extensionPage = await openExtensionPage(
      context,
      extensionId,
      "options.html"
    );
    const { folderId, childId, dbmKey } = await extensionPage.evaluate(
      async ({ testId }) => {
        const folder = await new Promise((resolve) =>
          chrome.bookmarks.create({ title: `folder-del-${testId}` }, resolve)
        );
        const child = await new Promise((resolve) =>
          chrome.bookmarks.create(
            {
              parentId: folder.id,
              title: `tracked-child-${testId}`,
              url: `https://example.com/folder-child-${testId}`,
            },
            resolve
          )
        );
        const key = `dbm_${child.id}`;
        await new Promise((resolve) => {
          chrome.storage.local.get(["dbm_ids"], (result) => {
            const ids = result.dbm_ids || [];
            chrome.storage.local.set(
              {
                dbm_ids: ids.includes(key) ? ids : [...ids, key],
                [key]: { regExp: "example\\.com", history: [] },
              },
              resolve
            );
          });
        });
        return { folderId: folder.id, childId: child.id, dbmKey: key };
      },
      { testId }
    );

    await sendRuntimeMessage(extensionPage, "REMOVE_BM_NODE", {
      id: folderId,
    });

    await expect
      .poll(async () => {
        const storage = await extensionPage.evaluate(
          async ({ key }) => {
            return new Promise((resolve) =>
              chrome.storage.local.get(["dbm_ids", key], resolve)
            );
          },
          { key: dbmKey }
        );
        const hasKey = Object.prototype.hasOwnProperty.call(storage, dbmKey);
        const idsContain = (storage.dbm_ids || []).includes(dbmKey);
        return !hasKey && !idsContain && storage[dbmKey] === undefined;
      })
      .toBe(true);

    const childStillThere = await extensionPage.evaluate(
      async ({ id }) => {
        return new Promise((resolve) => {
          chrome.bookmarks.get(id, (results) => resolve(results));
        });
      },
      { id: childId }
    );
    expect(childStillThere == null || childStillThere.length === 0).toBe(true);

    await extensionPage.close();
  });

  test("given tracked bookmark when many URL updates then history length stays at cap 10", async () => {
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

    for (let i = 0; i < 12; i += 1) {
      await extensionPage.evaluate(
        async ({ id, testId, index }) => {
          const url = `https://example.com/history-${testId}-${index}`;
          await new Promise((resolve, reject) => {
            chrome.bookmarks.update(id, { url }, () => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                resolve();
              }
            });
          });
        },
        { id: created.id, testId, index: i }
      );
      await expect
        .poll(
          async () =>
            (
              await getBookmarkState(extensionPage, title)
            ).dbmItem?.history?.length ?? 0,
          { timeout: 5000 }
        )
        .toBe(Math.min(i + 1, 10));
    }
    await extensionPage.close();
  });
});
