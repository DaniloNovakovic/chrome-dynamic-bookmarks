import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BookmarkTreeView } from "./BookmarkTreeView";

describe("TreeView", () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders properly", () => {
    act(() => {
      const nodes = {
        "0": {
          id: "0",
          children: ["1", "2"]
        },
        "1": {
          id: "1",
          title: "Bookmarks bar",
          children: []
        },
        "2": {
          id: "2",
          title: "Other bookmarks",
          children: []
        }
      };
      render(<BookmarkTreeView nodes={nodes} />, container);
    });
  });
});
