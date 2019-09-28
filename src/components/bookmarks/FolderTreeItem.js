import React from "react";
import PropTypes from "prop-types";
import StyledTreeItem from "../helpers/StyledTreeItem";
import FolderIcon from "@material-ui/icons/Folder";

export default function FolderTreeItem(props) {
  const { children = [], id, title } = props;

  let inputProps = {
    key: id,
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

FolderTreeItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element)
};
