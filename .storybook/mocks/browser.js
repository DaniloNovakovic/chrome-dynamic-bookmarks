import mockTabs from "./mockTabs";
import mockRuntime from "./mockRuntime";

const createMockFn = () => {
  let implementation = () => {};

  const mockFn = (...args) => implementation(...args);
  mockFn.mockImplementation = (nextImplementation) => {
    implementation = nextImplementation;
    return mockFn;
  };

  return mockFn;
};

const createEvent = () => ({
  addListener: createMockFn(),
  removeListener: createMockFn(),
  hasListener: createMockFn(),
});

const chrome = {
  runtime: {
    lastError: null,
    onMessage: createEvent(),
    sendMessage: createMockFn(),
  },
  tabs: {
    query: createMockFn(),
  },
};

mockTabs(chrome);
mockRuntime(chrome);

Object.assign(globalThis, { chrome });
