import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import { Typography, Collapse, Box } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./TreeItemStyles";

const defaultChildren = [];

export default function TreeItem({
  selected,
  expanded,
  labelText,
  labelIcon: LabelIcon,
  expandIcon: ExpandIcon = ExpandMoreIcon,
  toggleExpanded,
  children = defaultChildren,
  ...other
}) {
  const classes = useStyles();
  const labelElement = useRef(null);

  useEffect(() => {
    if (selected) {
      labelElement.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
    }
  }, [selected]);

  function handleToggleExpanded(event) {
    if (toggleExpanded) {
      toggleExpanded();
      event.stopPropagation();
    }
  }

  return (
    <Box>
      <Box
        ref={labelElement}
        className={clsx(classes.labelRoot, { [classes.selected]: selected })}
        onDoubleClick={handleToggleExpanded}
        {...other}
      >
        {children.length == 0 ? (
          <ExpandIcon style={{ opacity: 0 }} />
        ) : (
          <ExpandIcon onClick={handleToggleExpanded} />
        )}
        {LabelIcon && <LabelIcon className={classes.labelIcon} />}
        <Typography variant="body2" className={classes.labelText} noWrap>
          {labelText}
        </Typography>
      </Box>
      <Collapse className={classes.children} in={expanded}>
        {children}
      </Collapse>
    </Box>
  );
}
