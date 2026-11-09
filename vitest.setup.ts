import { vi } from "vitest";

const createEvent = () => ({
  addListener: vi.fn(),
  removeListener: vi.fn(),
  hasListener: vi.fn(),
});

const chromeMock = {
  bookmarks: {
    create: vi.fn(),
    get: vi.fn(),
    getChildren: vi.fn(),
    getTree: vi.fn(),
    move: vi.fn(),
    remove: vi.fn(),
    removeTree: vi.fn(),
    search: vi.fn(),
    update: vi.fn(),
    onChanged: createEvent(),
    onCreated: createEvent(),
    onMoved: createEvent(),
    onRemoved: createEvent(),
  },
  runtime: {
    connect: vi.fn(),
    lastError: null,
    onInstalled: createEvent(),
    onMessage: createEvent(),
    sendMessage: vi.fn(),
  },
  storage: {
    local: {
      clear: vi.fn(),
      get: vi.fn(),
      remove: vi.fn(),
      set: vi.fn(),
    },
    sync: {
      clear: vi.fn(),
      get: vi.fn(),
      remove: vi.fn(),
      set: vi.fn(),
    },
  },
  tabs: {
    create: vi.fn(),
    query: vi.fn(),
    update: vi.fn(),
    onUpdated: createEvent(),
  },
  windows: {
    create: vi.fn(),
  },
};

Object.assign(globalThis, {
  chrome: chromeMock,
});
