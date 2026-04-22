import {
  actionTypes,
  eventTypes,
  requestTypes,
  responseTypes,
} from "@/shared/constants";

const mockSendMessage = jest.fn();
const mockGetBookmarkNodes = jest.fn();

jest.mock("@/shared/lib/browser", () => ({
  sendMessage: (...args: any[]) => mockSendMessage(...args),
}));

jest.mock("@/shared/lib/browser/dynBookmarksFacade", () => ({
  getBookmarkNodes: (...args: any[]) => mockGetBookmarkNodes(...args),
}));

import {
  addBookmarkNode,
  editBookmarkNode,
  getBookmarkNodes,
  moveBookmarkNode,
} from "./bookmarkNodesActions";

describe("bookmarkNodesActions", () => {
  beforeEach(() => {
    mockSendMessage.mockReset();
    mockGetBookmarkNodes.mockReset();
  });

  it("dispatches success action for getBookmarkNodes", () => {
    const dispatch = jest.fn();
    mockGetBookmarkNodes.mockImplementation((done: any) =>
      done(null, { "1": { id: "1" } })
    );

    getBookmarkNodes()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.GET_BM_NODES_SUCCESS,
      bookmarkNodes: { "1": { id: "1" } },
    });
  });

  it("dispatches create event and alert for addBookmarkNode", () => {
    const dispatch = jest.fn();
    mockSendMessage.mockImplementation((_type: any, _data: any, done: any) =>
      done({
        type: responseTypes.SUCCESS,
        message: "created",
        data: { id: "9", parentId: "1", title: "A" },
      })
    );

    addBookmarkNode({ id: "9" } as any)(dispatch);

    expect(mockSendMessage).toHaveBeenCalledWith(
      requestTypes.ADD_BM_NODE,
      expect.any(Object),
      expect.any(Function)
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: eventTypes.BM_NODE_CREATED,
      data: { id: "9", parentId: "1", title: "A" },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.ALERT_SUCCESS,
      message: "created",
    });
  });

  it("dispatches node changed event for editBookmarkNode data response", () => {
    const dispatch = jest.fn();
    mockSendMessage.mockImplementation((_type: any, _data: any, done: any) =>
      done({
        type: responseTypes.SUCCESS,
        message: "edited",
        data: { id: "2", title: "Changed" },
      })
    );

    editBookmarkNode({ id: "2" } as any)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: eventTypes.BM_NODE_CHANGED,
      data: { id: "2", title: "Changed" },
    });
  });

  it("dispatches alert error for moveBookmarkNode failures", () => {
    const dispatch = jest.fn();
    mockSendMessage.mockImplementation((_type: any, _data: any, done: any) =>
      done({
        type: responseTypes.ERROR,
        message: "cannot move",
      })
    );

    moveBookmarkNode("2", { parentId: "3", index: 0 })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.ALERT_ERROR,
      message: "cannot move",
    });
  });
});
