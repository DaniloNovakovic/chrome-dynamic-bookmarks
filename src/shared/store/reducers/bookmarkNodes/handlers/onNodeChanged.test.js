import { onNodeChanged } from "./onNodeChanged";

describe("onNodeChanged", () => {
  let initialState = {};

  beforeEach(() => {
    initialState = {
      data: {
        "21": {
          dateAdded: 1567119984768,
          id: "21",
          index: 6,
          parentId: "2",
          title: "BM_TEST",
          regExp: "test",
          url: "https://www.test.com",
        },
      },
      isFaulted: false,
      errMsg: "",
    };
  });

  it("updates node", () => {
    const newTitle = "BM_TITLE_NEW";
    const newRegExp = "BM_REGEXP_NEW";
    const newUrl = "BM_URL_NEW";

    const action = {
      data: {
        id: "21",
        title: newTitle,
        regExp: newRegExp,
        url: newUrl,
      },
    };

    const expectedState = {
      data: {
        "21": {
          dateAdded: 1567119984768,
          id: "21",
          index: 6,
          parentId: "2",
          title: newTitle,
          regExp: newRegExp,
          url: newUrl,
        },
      },
      isFaulted: false,
      errMsg: "",
    };

    const actualState = onNodeChanged(initialState, action);
    expect(actualState).toEqual(expectedState);
  });

  it("can update regexp to null", () => {
    const newRegExp = null;

    const action = {
      data: {
        id: "21",
        regExp: newRegExp,
      },
    };

    const expectedState = {
      data: {
        "21": {
          dateAdded: 1567119984768,
          id: "21",
          index: 6,
          parentId: "2",
          title: "BM_TEST",
          regExp: newRegExp,
          url: "https://www.test.com",
        },
      },
      isFaulted: false,
      errMsg: "",
    };

    const actualState = onNodeChanged(initialState, action);
    expect(actualState).toEqual(expectedState);
  });
});
