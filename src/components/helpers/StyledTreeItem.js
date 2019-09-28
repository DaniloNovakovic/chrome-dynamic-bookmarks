import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
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
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1
  }
}));

export default function StyledTreeItem(props) {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    children = [],
    nodeId,
    ...other
  } = props;

  console.log(labelText, children);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  const ExpandIcon = expanded ? ExpandMoreIcon : ChevronRightIcon;

  return (
    <Box {...other}>
      <Box className={classes.labelRoot} onDoubleClick={toggleExpanded}>
        {children.length == 0 ? (
          <ExpandIcon style={{ opacity: 0 }} />
        ) : (
          <ExpandIcon onClick={toggleExpanded} />
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
  children: PropTypes.arrayOf(PropTypes.element)
};
