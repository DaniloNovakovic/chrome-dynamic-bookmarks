import type { SvgIconComponent } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Collapse, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import React, { useCallback, useEffect, useRef } from "react";

const defaultChildren = [];

const getLabelRootSx =
  (selected?: boolean): SxProps<Theme> =>
  (theme) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
    userSelect: "none",
    backgroundColor: selected ? theme.palette.action.selected : undefined,
    "&:hover": {
      backgroundColor: selected
        ? theme.palette.action.selected
        : theme.palette.action.hover,
      cursor: "pointer",
    },
  });

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
  className,
  ...other
}: TreeItemProps) {
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
    [toggleExpanded],
  );

  return (
    <Box>
      <Box
        ref={labelElement}
        className={className}
        sx={getLabelRootSx(selected)}
        onDoubleClick={handleToggleExpanded}
        {...other}
      >
        {React.Children.count(children) === 0 ? (
          <ExpandIcon style={{ opacity: 0 }} />
        ) : (
          <ExpandIcon onClick={handleToggleExpanded} />
        )}
        {LabelIcon && (
          <LabelIcon
            color={tracked ? "primary" : "inherit"}
            sx={(theme) => ({
              marginRight: theme.spacing(1),
              fill: theme.treeViewIconColor || "currentColor",
            })}
          />
        )}
        <Typography
          variant="body2"
          sx={{ fontWeight: "inherit", flexGrow: 1 }}
          noWrap
        >
          {labelText}
        </Typography>
      </Box>
      <Collapse
        sx={(theme) => ({ paddingLeft: theme.spacing(1) })}
        in={expanded}
      >
        {children}
      </Collapse>
    </Box>
  );
}
