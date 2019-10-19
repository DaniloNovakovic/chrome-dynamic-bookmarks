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

const defaultChildren = [];

export function FolderTreeItem({
  node,
  applyFilter,
  selected = false,
  initExpanded = false,
  children = defaultChildren
}) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (initExpanded) {
      setExpanded(true);
    }
  }, [initExpanded]);

  function toggleExpanded() {
    setExpanded(!expanded);
  }
  function handleClick() {
    if (!selected) {
      applyFilter({ parentId: id });
    }
  }

  const { id, title: labelText } = node || {};

  return (
    <TreeItem
      labelText={labelText}
      expandIcon={expanded ? ExpandMoreIcon : ChevronRightIcon}
      labelIcon={expanded ? FolderOpenIcon : FolderIcon}
      selected={selected}
      expanded={expanded}
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
    initExpanded: _isAncestor(breadcrumbIdsSelector(state), node.id)
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
  }),
  children: PropTypes.arrayOf(PropTypes.element)
};
