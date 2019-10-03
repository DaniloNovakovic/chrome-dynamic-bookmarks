import React from "react";
import PropTypes from "prop-types";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import StyledTreeItem from "../helpers/StyledTreeItem";

export default function FileTreeItem(props) {
  const { id, title = "" } = props;
  return (
    <StyledTreeItem
      key={id}
      labelText={title}
      labelIcon={InsertDriveFileIcon}
    />
  );
}

FileTreeItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
