import React from "react";
import List from "@material-ui/core/List";
import FileListItem from "./FileListItem";
import FolderListItem from "./FolderListItem";

export default function BookmarkList() {
  const item = {
    title: "Regular Expressions (RegEx) Tutorial #1 - What is RegEx? - YouTube",
    url:
      "https://www.youtube.com/watch?v=r6I-Ahc0HB4&list=PL4cUxeGkcC9g6m_6Sld9Q4jzqdqHd2HiD"
  };

  return (
    <List aria-label="main bookmark list" dense>
      <FolderListItem bookmark={item} />
      <FileListItem bookmark={item} />
      <FileListItem bookmark={item} />
    </List>
  );
}
