import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import FolderListItem from "./FolderListItem";
import FileListItem from "./FileListItem";
import { isFolder } from "utils/bookmarkNodes/comparisons";
import filterNodes from "utils/bookmarkNodes/filterNodes";
import getSortedNodes from "utils/bookmarkNodes/getSortedNodes";

function mapNodeToJsx(node) {
  return isFolder(node) ? (
    <FolderListItem key={node.id} bookmark={node} />
  ) : (
    <FileListItem key={node.id} bookmark={node} />
  );
}

export function BookmarkList({ nodes = {} }) {
  const sorted = getSortedNodes(nodes);
  const items = sorted.map(node => {
    return mapNodeToJsx(node);
  });

  return (
    <List aria-label="main bookmark list" dense>
      {items}
    </List>
  );
}

function getFilteredNodes({ bookmarkNodes = {} }) {
  return filterNodes(bookmarkNodes.nodes, bookmarkNodes.filter);
}

function mapStateToProps(state) {
  return { nodes: getFilteredNodes(state) };
}

export default connect(mapStateToProps)(BookmarkList);
