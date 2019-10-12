import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Typography, Collapse, Box } from "@material-ui/core";
import useStyles from "../helpers/TreeItemStyles";
import { applyFilter } from "shared/store/actions";
import {
  breadcrumbIdsSelector,
  filterSelector
} from "shared/store/selectors/index";

export function FolderTreeItem({
  children = [],
  id,
  title,
  applyFilter,
  selected = false,
  initExpanded = false
}) {
  const [expanded, setExpanded] = useState(false);
  const labelElement = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (selected) {
      labelElement.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
    }
  }, [selected]);

  useEffect(() => {
    if (initExpanded) {
      setExpanded(true);
    }
  }, [initExpanded]);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  const ExpandIcon = expanded ? ExpandMoreIcon : ChevronRightIcon;
  const FolderItemIcon = expanded ? FolderOpenIcon : FolderIcon;

  return (
    <Box>
      <Box
        ref={labelElement}
        className={clsx(classes.labelRoot, { [classes.selected]: selected })}
        onClick={() => !selected && applyFilter({ parentId: id })}
        onDoubleClick={() => toggleExpanded()}
      >
        {children.length == 0 ? (
          <ExpandIcon style={{ opacity: 0 }} />
        ) : (
          <ExpandIcon
            onClick={event => {
              event.stopPropagation();
              toggleExpanded && toggleExpanded();
            }}
          />
        )}
        <FolderItemIcon className={classes.labelIcon} />
        <Typography variant="body2" className={classes.labelText} noWrap>
          {title}
        </Typography>
      </Box>
      <Collapse className={classes.children} in={expanded}>
        {children}
      </Collapse>
    </Box>
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

function mapStateToProps(state, { id }) {
  return {
    selected: filterSelector(state).parentId === id,
    initExpanded: _isAncestor(breadcrumbIdsSelector(state), id)
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
