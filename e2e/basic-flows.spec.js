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
});
