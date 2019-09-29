import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import useStyles from "./TreeItemStyles";

export default function StyledTreeItem({
  labelText,
  labelIcon: LabelIcon,
  labelInfo,
  children = [],
  selected = false,
  expanded = false,
  toggleExpanded,
  labelProps = {},
  ...other
}) {
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

  const ExpandIcon = expanded ? ExpandMoreIcon : ChevronRightIcon;

  return (
    <Box {...other}>
      <Box
        ref={labelElement}
        className={clsx(
          classes.labelRoot,
          { [classes.selected]: selected },
          labelProps.className
        )}
        {...labelProps}
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
        <LabelIcon color="primary" className={classes.labelIcon} />
        <Typography variant="body2" className={classes.labelText} noWrap>
          {labelText}
        </Typography>
        <Typography variant="caption" color="inherit">
          {labelInfo}
        </Typography>
      </Box>
      <Collapse className={classes.children} in={expanded}>
        {children}
      </Collapse>
    </Box>
  );
}

StyledTreeItem.propTypes = {
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
  selected: PropTypes.bool,
  labelProps: PropTypes.any,
  expanded: PropTypes.bool,
  toggleExpanded: PropTypes.func
};
