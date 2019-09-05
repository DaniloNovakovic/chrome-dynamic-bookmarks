import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { logWarn } from "../../utils/log";
import { bm as bookmarks } from "../../lib/bookmarks";
import createTree from "./utils/createTree";

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

function generateTreeItems(done) {
  bookmarks.getTreeRoot((errMsg, treeRoot) => {
    if (errMsg) {
      return done(errMsg);
    }
    let items = treeRoot.children.map(child => createTree(child));
    done(null, items);
  });
}

export default function BookmarkTreeView() {
  const [treeItems, setTreeItems] = React.useState([]);
  const classes = useStyles();

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
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      children={treeItems}
    />
  );
}
