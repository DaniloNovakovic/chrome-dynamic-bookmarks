import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => {
  return {
    children: {
      paddingLeft: theme.spacing(1)
    },
    label: {
      fontWeight: "inherit",
      color: "inherit"
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0.5, 0),
      userSelect: "none",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
        cursor: "pointer"
      },
      "&$selected, &$selected:hover": {
        backgroundColor: theme.palette.action.selected
      }
    },
    labelIcon: {
      marginRight: theme.spacing(1)
    },
    labelText: {
      fontWeight: "inherit",
      flexGrow: 1
    },
    /* Pseudo-class applied to the root element if `selected={true}`. */
    selected: {}
  };
});

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
  const classes = useStyles();

  const ExpandIcon = expanded ? ExpandMoreIcon : ChevronRightIcon;

  return (
    <Box {...other}>
      <Box
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
