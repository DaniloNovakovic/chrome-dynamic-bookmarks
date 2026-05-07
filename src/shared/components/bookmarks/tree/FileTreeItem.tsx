import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import React from "react";

import TreeItem from "./TreeItem";

type FileTreeItemProps = {
  node: {
    title?: string;
  };
  [key: string]: unknown;
};

export default function FileTreeItem({ node }: FileTreeItemProps) {
  const { title = "" } = node || {};
  return <TreeItem labelText={title} labelIcon={InsertDriveFileIcon} />;
}
