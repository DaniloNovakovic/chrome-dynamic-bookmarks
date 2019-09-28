import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import StyledTreeItem from "../helpers/StyledTreeItem";
import FolderIcon from "@material-ui/icons/Folder";
import { applyFilter } from "store/actions/bookmarkNodesActions";

function _isEmpty(array = []) {
  return array && array.length == 0;
}

export function FolderTreeItem(props) {
  const { children = [], id, title, selectedNodeId, applyFilter } = props;

  let inputProps = {
    key: id,
    selected: selectedNodeId == id,
    labelText: title,
    labelIcon: FolderIcon,
    labelProps: {
      onClick: () => applyFilter({ parentId: id })
    }
  };

  if (!_isEmpty(children)) {
    inputProps.children = children;
  }

  return <StyledTreeItem {...inputProps} />;
}

function mapStateToProps({ bookmarkNodes }) {
  return { selectedNodeId: bookmarkNodes.filter.parentId };
}

export default connect(
  mapStateToProps,
  { applyFilter }
)(FolderTreeItem);

FolderTreeItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element)
};
