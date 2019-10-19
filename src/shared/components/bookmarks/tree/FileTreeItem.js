import React from "react";
import PropTypes from "prop-types";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { StyledTreeItem } from "shared/components/helpers";

export default function FileTreeItem({ node }) {
  const { id, title = "" } = node || {};
  return (
    <StyledTreeItem
      key={id}
      labelText={title}
      labelIcon={InsertDriveFileIcon}
    />
  );
}

FileTreeItem.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  })
};
