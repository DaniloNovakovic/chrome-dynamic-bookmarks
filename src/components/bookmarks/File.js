import React from "react";
import StyledTreeItem from "../helpers/StyledTreeItem";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

export default function File(props) {
  const { id, title = "" } = props;
  return (
    <StyledTreeItem
      key={id}
      nodeId={id}
      labelText={title}
      labelIcon={InsertDriveFileIcon}
    />
  );
}
