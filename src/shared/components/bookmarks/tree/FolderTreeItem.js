import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { applyFilter } from "shared/store/actions";
import {
  breadcrumbIdsSelector,
  filterSelector
} from "shared/store/selectors/index";
import TreeItem from "./TreeItem";

export function FolderTreeItem({
  node,
  applyFilter,
  selected = false,
  breadcrumbIds,
  children
}) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (_isAncestor(breadcrumbIds, node.id)) {
      setExpanded(true);
    }
  }, [breadcrumbIds]);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  function handleClick() {
    if (!selected) {
      applyFilter({ parentId: node.id });
    }
  }

  return (
    <TreeItem
      selected={selected}
      expanded={expanded}
      expandIcon={expanded ? ExpandMoreIcon : ChevronRightIcon}
      labelIcon={expanded ? FolderOpenIcon : FolderIcon}
      labelText={node.title}
      toggleExpanded={toggleExpanded}
      onClick={handleClick}
      children={children}
    />
  );
}

function _isAncestor(breadcrumbIds = [], id = "0") {
  for (let i = 0; i < breadcrumbIds.length - 1; ++i) {
    if (id == breadcrumbIds[i]) {
      return true;
    }
  }
  return false;
}

function mapStateToProps(state, { node }) {
  return {
    selected: filterSelector(state).parentId === node.id,
    breadcrumbIds: breadcrumbIdsSelector(state)
  };
}

export default connect(
  mapStateToProps,
  { applyFilter }
)(FolderTreeItem);

FolderTreeItem.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  })
};
