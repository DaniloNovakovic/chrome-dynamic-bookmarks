import type { RequestMessage } from "./createRouter";

describe("addMessageListeners", () => {
  const mockAddListener = jest.fn();
  const mockHandleRequest = jest.fn();
  const mockRegisterRoutes = jest.fn();
  const mockCreateRouter = jest.fn(() => ({
    handleRequest: mockHandleRequest,
  }));

  jest.mock("@/shared/lib/browser", () => ({
    getCurrentBrowser: () => ({
      runtime: {
        onMessage: {
          addListener: mockAddListener,
        },
      },
    }),
  }));

  jest.mock("./createRouter", () => ({
    __esModule: true,
    default: () => mockCreateRouter(),
  }));

  jest.mock("./registerRoutes", () => ({
    __esModule: true,
    default: (router: unknown) => mockRegisterRoutes(router),
  }));

  beforeEach(() => {
    mockAddListener.mockReset();
    mockHandleRequest.mockReset();
    mockRegisterRoutes.mockReset();
    mockCreateRouter.mockClear();
  });

  it("registers routes and forwards runtime messages to router", () => {
    const addMessageListeners = require("./addMessageListeners")
      .default as typeof import("./addMessageListeners").default;
    addMessageListeners();

    expect(mockCreateRouter).toHaveBeenCalledTimes(1);
    expect(mockRegisterRoutes).toHaveBeenCalledWith(
      expect.objectContaining({
        handleRequest: expect.any(Function),
      })
    );
    expect(mockAddListener).toHaveBeenCalledTimes(1);

    const messageHandler = mockAddListener.mock.calls[0][0];
    const sendResponse = jest.fn();
    const request: RequestMessage<{ id: string }> = {
      type: "ADD_BM_NODE",
      data: { id: "1" },
    };
    const retVal = messageHandler(request, { id: "sender" }, sendResponse);

    expect(mockHandleRequest).toHaveBeenCalledWith(request, sendResponse);
    expect(retVal).toBe(true);
  });
});
