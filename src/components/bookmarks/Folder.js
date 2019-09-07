import React from "react";
import PropTypes from "prop-types";
import StyledTreeItem from "../helpers/StyledTreeItem";
import FolderIcon from "@material-ui/icons/Folder";

export default function Folder(props) {
  const { children = [], id, title } = props;

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

Folder.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element)
};
