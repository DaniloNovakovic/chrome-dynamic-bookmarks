# Agent guide — chrome-dynamic-bookmarks

Concise orientation for coding agents. End-user behavior and screenshots live in [README.md](README.md).

## What this is

Chrome **Manifest V3** extension: when a tab’s URL matches a bookmark’s stored `regExp`, the background updates that bookmark’s URL. Chrome bookmark nodes use `chrome.bookmarks`; dynamic metadata (`regExp`, history, …) uses `chrome.storage.local` via `DynamicBookmarksManager` under `src/shared/lib/browser/storage/`.

## Stack and layout

- **UI**: React 19, Redux, MUI, Emotion, Formik/Yup.
- **Build**: Vite; entry bundles are configured in [vite.config.ts](vite.config.ts) for `popup` (TSX), `bookmarkManager`, `options`, and `background` (service worker). HTML source templates stay in [public/](public/) and are injected into `build/` during the Vite build.
- **Imports**: path alias `@/` → `src/` ([tsconfig.json](tsconfig.json)); production `src/` code is TypeScript (`.ts`/`.tsx`). Tests and repo tooling may still be JavaScript — match local style.
- **Browser API**: prefer `getCurrentBrowser()` from `src/shared/lib/browser/getCurrentBrowser.ts` instead of hard-coding `chrome` where the codebase already does.

## Package manager and CI

Use **pnpm 10.33.4** (`packageManager` in [package.json](package.json)). [`.github/workflows/node.js.yml`](.github/workflows/node.js.yml) runs `pnpm install`, `pnpm build`, `pnpm test`.

## Commands

| Task              | Command            |
| ----------------- | ------------------ |
| Dev bundle        | `pnpm dev`         |
| Watch dev         | `pnpm watch`       |
| Production bundle | `pnpm build`       |
| Lint              | `pnpm lint`        |
| Typecheck         | `pnpm check:types` |
| Tests             | `pnpm test`        |
| Storybook         | `pnpm storybook`   |

Run **`pnpm lint`**, **`pnpm check:types`**, and **`pnpm test`** before opening a PR (matches CI).

## Load the extension locally

After `pnpm build` or `pnpm dev`, output is under **`build/`**. In Chrome: `chrome://extensions/` → Developer mode → **Load unpacked** → choose the repo’s **`build`** directory (not the repo root).

## Where to change behavior

| Area                                | Location                                                                                                                                                                                                                                                        |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tab URL → update matching bookmarks | [src/background/addTabsListeners.ts](src/background/addTabsListeners.ts) (`dbm.findAll`, `RegExp`, `bookmarks.update`)                                                                                                                                          |
| Runtime messages (CRUD, etc.)       | [src/background/addMessageListeners.ts](src/background/addMessageListeners.ts) → [createRouter.ts](src/background/createRouter.ts) → [registerRoutes.ts](src/background/registerRoutes.ts) → [src/background/requestHandlers/](src/background/requestHandlers/) |
| Client → background calls           | [src/shared/lib/browser/messages/sendMessage.ts](src/shared/lib/browser/messages/sendMessage.ts) — payload shape `{ type, data }`; listener returns **`true`** for async `sendResponse`                                                                         |
| Bookmark + storage orchestration    | [src/shared/lib/browser/dynBookmarksFacade.ts](src/shared/lib/browser/dynBookmarksFacade.ts)                                                                                                                                                                    |
| Storage keys / migrations           | [src/shared/lib/browser/storage/](src/shared/lib/browser/storage/)                                                                                                                                                                                              |
| Redux + shared UI                   | [src/shared/](src/shared/)                                                                                                                                                                                                                                      |
| Entry-specific UI                   | `src/popup/`, `src/bookmarkManager/`, `src/options/`                                                                                                                                                                                                            |

Request `type` strings are defined in [src/shared/constants/requestTypes.ts](src/shared/constants/requestTypes.ts).

## Manifest and CSP

[public/manifest.json](public/manifest.json) is used as the source manifest and transformed into `build/manifest.json` with version/description from `package.json`. It includes **localhost** in CSP for dev tooling; be careful when changing ports or tightening CSP for release.

## Tests

Vitest + [vitest.setup.ts](vitest.setup.ts) (local Chrome API mock). Most tests live next to pure helpers under `src/shared/lib/**` and some store helpers; background and UI have little automated coverage.
