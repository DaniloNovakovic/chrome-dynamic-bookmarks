const mockAddListener = jest.fn();
const mockMigrateStorage = jest.fn();

jest.mock("@/shared/lib/browser", () => ({
  getCurrentBrowser: () => ({
    runtime: {
      onInstalled: {
        addListener: mockAddListener,
      },
    },
  }),
  migrateStorage: (...args) => mockMigrateStorage(...args),
}));

describe("addInstalledListeners", () => {
  beforeEach(() => {
    mockAddListener.mockReset();
    mockMigrateStorage.mockReset();
  });

  it("runs migration on extension update", () => {
    const addInstalledListeners = require("./addInstalledListeners").default;
    addInstalledListeners();

    const installedHandler = mockAddListener.mock.calls[0][0];
    installedHandler({ reason: "update" });

    expect(mockMigrateStorage).toHaveBeenCalledTimes(1);
  });

  it("skips migration for non-update install reasons", () => {
    const addInstalledListeners = require("./addInstalledListeners").default;
    addInstalledListeners();

    const installedHandler = mockAddListener.mock.calls[0][0];
    installedHandler({ reason: "install" });

    expect(mockMigrateStorage).not.toHaveBeenCalled();
  });
});
