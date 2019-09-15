import React from "react";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import { isFolder } from "./utils/comparisons";
import FolderListItem from "./FolderListItem";
import FileListItem from "./FileListItem";
import filterNodes from "./utils/filterNodes";
import getSortedNodes from "./utils/getSortedNodes";

export default function BookmarkList() {
  const bookmarkNodes = useSelector(state => state.bookmarkNodes);

  const filtered = filterNodes(bookmarkNodes);
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

function mapNodeToJsx(node) {
  return isFolder(node) ? (
    <FolderListItem key={node.id} bookmark={node} />
  ) : (
    <FileListItem key={node.id} bookmark={node} />
  );
}
