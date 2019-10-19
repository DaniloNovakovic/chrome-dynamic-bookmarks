import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import { Typography, Collapse, Box } from "@material-ui/core";
import useStyles from "./TreeItemStyles";

export default function TreeItem({
  selected,
  onClick,
  toggleExpanded,
  children,
  expandIcon: ExpandIcon,
  labelIcon: LabelIcon,
  labelText,
  expanded
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

  return (
    <Box>
      <Box
        ref={labelElement}
        className={clsx(classes.labelRoot, { [classes.selected]: selected })}
        onClick={onClick}
        onDoubleClick={() => toggleExpanded()}
      >
        {children.length == 0 ? (
          <ExpandIcon style={{ opacity: 0 }} />
        ) : (
          <ExpandIcon
            onClick={event => {
              event.stopPropagation();
              toggleExpanded();
            }}
          />
        )}
        <LabelIcon className={classes.labelIcon} />
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
