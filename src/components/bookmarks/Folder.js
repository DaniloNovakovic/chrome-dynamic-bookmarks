import React from "react";
import StyledTreeItem from "../helpers/StyledTreeItem";
import FolderIcon from "@material-ui/icons/Folder";

export default function Folder(props) {
  const { children, id, title } = props;

  let inputProps = {
    key: id,
    nodeId: id,
    labelText: title,
    labelIcon: FolderIcon
  };

  if (!_isEmpty(children)) {
    inputProps.children = children;
  }

  return <StyledTreeItem {...inputProps} />;
}

function _isEmpty(array = []) {
  return array && array.length == 0;
}
