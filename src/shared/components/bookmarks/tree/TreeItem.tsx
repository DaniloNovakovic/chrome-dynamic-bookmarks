import { Box, Collapse, Typography } from "@material-ui/core";
import type { SvgIconComponent } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import React, { useCallback, useEffect, useRef } from "react";

import useStyles from "./TreeItemStyles";

const defaultChildren = [];

type TreeItemProps = React.HTMLAttributes<HTMLDivElement> & {
  selected?: boolean;
  tracked?: boolean;
  expanded?: boolean;
  labelText?: string;
  labelIcon?: SvgIconComponent;
  expandIcon?: SvgIconComponent;
  toggleExpanded?: () => void;
  children?: React.ReactNode;
};

export default function TreeItem({
  selected,
  tracked,
  expanded,
  labelText,
  labelIcon: LabelIcon,
  expandIcon: ExpandIcon = ExpandMoreIcon,
  toggleExpanded,
  children = defaultChildren,
  ...other
}: TreeItemProps) {
  const classes = useStyles();
  const labelElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected && labelElement.current) {
      labelElement.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [selected]);

  const handleToggleExpanded = useCallback(
    (event: React.MouseEvent) => {
      if (toggleExpanded) {
        toggleExpanded();
        event.stopPropagation();
      }
    },
    [toggleExpanded]
  );

  return (
    <Box>
      <div
        ref={labelElement}
        className={clsx(classes.labelRoot, { [classes.selected]: selected })}
        onDoubleClick={handleToggleExpanded}
        {...other}
      >
        {React.Children.count(children) == 0 ? (
          <ExpandIcon style={{ opacity: 0 }} />
        ) : (
          <ExpandIcon onClick={handleToggleExpanded} />
        )}
        {LabelIcon && (
          <LabelIcon
            className={classes.labelIcon}
            color={tracked ? "primary" : "inherit"}
          />
        )}
        <Typography variant="body2" className={classes.labelText} noWrap>
          {labelText}
        </Typography>
      </div>
      <Collapse className={classes.children} in={expanded}>
        {children}
      </Collapse>
    </Box>
  );
}
