# Agent guide — chrome-dynamic-bookmarks

Concise orientation for coding agents. End-user behavior and screenshots live in [README.md](README.md).

## What this is

Chrome **Manifest V3** extension: when a tab’s URL matches a bookmark’s stored `regExp`, the background updates that bookmark’s URL. Chrome bookmark nodes use `chrome.bookmarks`; dynamic metadata (`regExp`, history, …) uses `chrome.storage.local` via `DynamicBookmarksManager` under `src/shared/lib/browser/storage/`.

## Stack and layout

- **UI**: React 16, Redux, Material-UI v4, Formik/Yup.
- **Build**: Webpack 4; multiple entries in [build-utils/webpack.common.js](build-utils/webpack.common.js): `popup` (TSX), `bookmarkManager`, `options`, `background` (service worker), plus `vendor`.
- **Imports**: path alias `@/` → `src/` ([tsconfig.json](tsconfig.json)); TypeScript is **gradual** (`strict` is off); many files are still `.js`/`.jsx` — match local style.
- **Browser API**: prefer `getCurrentBrowser()` from `src/shared/lib/browser/getCurrentBrowser.ts` instead of hard-coding `chrome` where the codebase already does.

## Package manager and CI

Use **Yarn 1.22.22** (`packageManager` in [package.json](package.json)). [`.github/workflows/node.js.yml`](.github/workflows/node.js.yml) runs `yarn install`, `yarn build`, `yarn test`.

## Commands

| Task | Command |
|------|---------|
| Dev bundle | `yarn dev` |
| Watch dev | `yarn watch` |
| Production bundle | `yarn build` |
| Lint | `yarn lint` |
| Typecheck | `yarn check:types` |
| Tests | `yarn test` |
| Storybook | `yarn storybook` |

Run **`yarn lint`**, **`yarn check:types`**, and **`yarn test`** before opening a PR (matches CI).

## Load the extension locally

After `yarn build` or `yarn dev`, output is under **`build/`**. In Chrome: `chrome://extensions/` → Developer mode → **Load unpacked** → choose the repo’s **`build`** directory (not the repo root).

## Where to change behavior

| Area | Location |
|------|----------|
| Tab URL → update matching bookmarks | [src/background/addTabsListeners.js](src/background/addTabsListeners.js) (`dbm.findAll`, `RegExp`, `bookmarks.update`) |
| Runtime messages (CRUD, etc.) | [src/background/addMessageListeners.js](src/background/addMessageListeners.js) → [createRouter.js](src/background/createRouter.js) → [registerRoutes.js](src/background/registerRoutes.js) → [src/background/requestHandlers/](src/background/requestHandlers/) |
| Client → background calls | [src/shared/lib/browser/messages/sendMessage.ts](src/shared/lib/browser/messages/sendMessage.ts) — payload shape `{ type, data }`; listener returns **`true`** for async `sendResponse` |
| Bookmark + storage orchestration | [src/shared/lib/browser/dynBookmarksFacade.ts](src/shared/lib/browser/dynBookmarksFacade.ts) |
| Storage keys / migrations | [src/shared/lib/browser/storage/](src/shared/lib/browser/storage/) |
| Redux + shared UI | [src/shared/](src/shared/) |
| Entry-specific UI | `src/popup/`, `src/bookmarkManager/`, `src/options/` |

Request `type` strings are defined in [src/shared/constants/requestTypes.ts](src/shared/constants/requestTypes.ts).

## Manifest and CSP

[public/manifest.json](public/manifest.json) is copied into `build/` with version/description from `package.json`. It includes **localhost** in CSP for dev tooling; be careful when changing ports or tightening CSP for release.

## Tests

Jest + [jest.setup.js](jest.setup.js) (`jest-chrome`). Most tests live next to pure helpers under `src/shared/lib/**` and some store helpers; background and UI have little automated coverage.
