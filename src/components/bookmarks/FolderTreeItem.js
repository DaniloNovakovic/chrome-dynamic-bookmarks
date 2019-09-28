import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import StyledTreeItem from "../helpers/StyledTreeItem";
import FolderIcon from "@material-ui/icons/Folder";
import { applyFilter } from "store/actions/bookmarkNodesActions";

function _isAncestor(breadcrumbs = [], id = "0") {
  for (let i = 0; i < breadcrumbs.length - 1; ++i) {
    if (id == breadcrumbs[i]) {
      return true;
    }
  }
  return false;
}

export function FolderTreeItem({
  children = [],
  id,
  title,
  selectedNodeId,
  applyFilter,
  breadcrumbs = []
}) {
  const [expanded, setExpanded] = useState(false);
  const selected = selectedNodeId == id;

  useEffect(() => {
    if (_isAncestor(breadcrumbs, id)) {
      setExpanded(true);
    }
  }, [breadcrumbs]);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  const labelProps = {
    onClick: () => !selected && applyFilter({ parentId: id })
  };

  return (
    <StyledTreeItem
      key={id}
      selected={selected}
      expanded={expanded}
      toggleExpanded={toggleExpanded}
      labelIcon={FolderIcon}
      labelText={title}
      labelProps={labelProps}
      children={children}
    />
  );
}

function mapStateToProps({ bookmarkNodes }) {
  return {
    selectedNodeId: bookmarkNodes.filter.parentId,
    breadcrumbs: bookmarkNodes.breadcrumbs
  };
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
