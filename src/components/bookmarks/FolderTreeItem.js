import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import StyledTreeItem from "../helpers/StyledTreeItem";
import FolderIcon from "@material-ui/icons/Folder";
import { applyFilter } from "store/actions/bookmarkNodesActions";
import { breadcrumbIdsSelector, filterSelector } from "store/selectors/index";

function _isAncestor(breadcrumbIds = [], id = "0") {
  for (let i = 0; i < breadcrumbIds.length - 1; ++i) {
    if (id == breadcrumbIds[i]) {
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
  breadcrumbIds = []
}) {
  const [expanded, setExpanded] = useState(false);
  const selected = selectedNodeId == id;

  useEffect(() => {
    if (_isAncestor(breadcrumbIds, id)) {
      setExpanded(true);
    }
  }, [breadcrumbIds]);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  const labelProps = {
    onClick: () => !selected && applyFilter({ parentId: id }),
    onDoubleClick: () => toggleExpanded()
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

function mapStateToProps(state) {
  return {
    selectedNodeId: filterSelector(state).parentId,
    breadcrumbIds: breadcrumbIdsSelector(state)
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
