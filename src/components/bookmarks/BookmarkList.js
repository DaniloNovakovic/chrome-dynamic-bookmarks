import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import { isFolder } from "./utils/comparisons";
import FolderListItem from "./FolderListItem";
import FileListItem from "./FileListItem";
import filterNodes from "./utils/filterNodes";
import getSortedNodes from "./utils/getSortedNodes";

function mapNodeToJsx(node) {
  return isFolder(node) ? (
    <FolderListItem key={node.id} bookmark={node} />
  ) : (
    <FileListItem key={node.id} bookmark={node} />
  );
}

export function BookmarkList({ nodes = {}, filter = {} }) {
  const filtered = filterNodes(nodes, filter);
  const sorted = getSortedNodes(filtered);
  const items = sorted.map(node => {
    return mapNodeToJsx(node);
  });

  return (
    <List aria-label="main bookmark list" dense>
      {items}
    </List>
  );
}

function mapStateToProps({ bookmarkNodes = {} }) {
  return { nodes: bookmarkNodes.nodes, filter: bookmarkNodes.filter };
}

export default connect(mapStateToProps)(BookmarkList);
