const createEvent = () => ({
  addListener: jest.fn(),
  removeListener: jest.fn(),
  hasListener: jest.fn(),
});

const chromeMock = {
  bookmarks: {
    create: jest.fn(),
    get: jest.fn(),
    getChildren: jest.fn(),
    getTree: jest.fn(),
    move: jest.fn(),
    remove: jest.fn(),
    removeTree: jest.fn(),
    search: jest.fn(),
    update: jest.fn(),
    onChanged: createEvent(),
    onCreated: createEvent(),
    onMoved: createEvent(),
    onRemoved: createEvent(),
  },
  runtime: {
    connect: jest.fn(),
    lastError: null,
    onInstalled: createEvent(),
    onMessage: createEvent(),
    sendMessage: jest.fn(),
  },
  storage: {
    local: {
      clear: jest.fn(),
      get: jest.fn(),
      remove: jest.fn(),
      set: jest.fn(),
    },
    sync: {
      clear: jest.fn(),
      get: jest.fn(),
      remove: jest.fn(),
      set: jest.fn(),
    },
  },
  tabs: {
    create: jest.fn(),
    query: jest.fn(),
    update: jest.fn(),
    onUpdated: createEvent(),
  },
  windows: {
    create: jest.fn(),
  },
};

Object.assign(global, {
  chrome: chromeMock,
});
