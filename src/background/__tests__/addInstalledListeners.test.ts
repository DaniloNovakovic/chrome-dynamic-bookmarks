import { beforeEach, describe, expect, it, vi } from "vitest";

import addInstalledListeners from "../addInstalledListeners";

const { mockAddListener, mockMigrateStorage } = vi.hoisted(() => ({
  mockAddListener: vi.fn(),
  mockMigrateStorage: vi.fn(),
}));

vi.mock("@/shared/lib/browser", () => ({
  getCurrentBrowser: () => ({
    runtime: {
      onInstalled: {
        addListener: mockAddListener,
      },
    },
  }),
  migrateStorage: (...args: unknown[]) => mockMigrateStorage(...args),
}));

describe("addInstalledListeners", () => {
  beforeEach(() => {
    mockAddListener.mockReset();
    mockMigrateStorage.mockReset();
  });

  it("runs migration on extension update", () => {
    addInstalledListeners();

    const installedHandler = mockAddListener.mock.calls[0][0];
    installedHandler({ reason: "update" });

    expect(mockMigrateStorage).toHaveBeenCalledTimes(1);
  });

  it("skips migration for non-update install reasons", () => {
    addInstalledListeners();

    const installedHandler = mockAddListener.mock.calls[0][0];
    installedHandler({ reason: "install" });

    expect(mockMigrateStorage).not.toHaveBeenCalled();
  });
});
