import React from "react";
import StyledTreeItem from "../helpers/StyledTreeItem";
import FolderIcon from "@material-ui/icons/Folder";

export default function Folder(props) {
  const { children, id, title } = props;
  return (
    <StyledTreeItem
      key={id}
      nodeId={id}
      labelText={title}
      labelIcon={FolderIcon}
      children={children}
    />
  );
}
