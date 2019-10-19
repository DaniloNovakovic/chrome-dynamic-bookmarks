import React from "react";
import PropTypes from "prop-types";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import TreeItem from "./TreeItem";

export default function FileTreeItem({ node }) {
  const { title = "" } = node || {};
  return <TreeItem labelText={title} labelIcon={InsertDriveFileIcon} />;
}

FileTreeItem.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  })
};
