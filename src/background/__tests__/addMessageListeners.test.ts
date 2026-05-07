import { beforeEach, describe, expect, it, vi } from "vitest";

import addMessageListeners from "../addMessageListeners";
import type { RequestMessage } from "../createRouter";

const mocks = vi.hoisted(() => {
  const mockHandleRequest = vi.fn();

  return {
    mockAddListener: vi.fn(),
    mockHandleRequest,
    mockRegisterRoutes: vi.fn(),
    mockCreateRouter: vi.fn(() => ({
      handleRequest: mockHandleRequest,
    })),
  };
});

vi.mock("@/shared/lib/browser", () => ({
  getCurrentBrowser: () => ({
    runtime: {
      onMessage: {
        addListener: mocks.mockAddListener,
      },
    },
  }),
}));

vi.mock("../createRouter", () => ({
  __esModule: true,
  default: () => mocks.mockCreateRouter(),
}));

vi.mock("../registerRoutes", () => ({
  __esModule: true,
  default: (router: unknown) => mocks.mockRegisterRoutes(router),
}));

describe("addMessageListeners", () => {
  beforeEach(() => {
    mocks.mockAddListener.mockReset();
    mocks.mockHandleRequest.mockReset();
    mocks.mockRegisterRoutes.mockReset();
    mocks.mockCreateRouter.mockClear();
  });

  it("registers routes and forwards runtime messages to router", () => {
    addMessageListeners();

    expect(mocks.mockCreateRouter).toHaveBeenCalledTimes(1);
    expect(mocks.mockRegisterRoutes).toHaveBeenCalledWith(
      expect.objectContaining({
        handleRequest: expect.any(Function),
      }),
    );
    expect(mocks.mockAddListener).toHaveBeenCalledTimes(1);

    const messageHandler = mocks.mockAddListener.mock.calls[0][0];
    const sendResponse = vi.fn();
    const request: RequestMessage<{ id: string }> = {
      type: "ADD_BM_NODE",
      data: { id: "1" },
    };
    const retVal = messageHandler(request, { id: "sender" }, sendResponse);

    expect(mocks.mockHandleRequest).toHaveBeenCalledWith(request, sendResponse);
    expect(retVal).toBe(true);
  });
});
