import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { logWarn } from "../../utils/log";
import { bm as bookmarks } from "../../lib/bookmarks";
import createTree from "./utils/createTree";

function generateTreeItems(done) {
  bookmarks.getTreeRoot((errMsg, treeRoot) => {
    if (errMsg) {
      return done(errMsg);
    }
    let items = treeRoot.children.map(child => createTree(child));
    done(null, items);
  });
}

export default function BookmarkTreeView({ className }) {
  const [treeItems, setTreeItems] = React.useState([]);

  React.useEffect(() => {
    generateTreeItems((errMsg, treeItems) => {
      if (errMsg) {
        return logWarn(errMsg);
      }
      setTreeItems(treeItems);
    });
  }, []);

  return (
    <TreeView
      className={className}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      children={treeItems}
    />
  );
}
