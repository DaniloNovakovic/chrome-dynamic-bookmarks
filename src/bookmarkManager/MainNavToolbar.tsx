import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Toolbar, Typography } from "@mui/material";
import React, { useCallback } from "react";

import { SearchInput } from "@/shared/components/helpers";

import MainNavMenu from "./MainNavMenu";

let oldParentId;

export default function MainNavToolbar({
  handleDrawerToggle,
  filter,
  applyFilter,
}) {
  const handleSearchInputChange = useCallback(
    (searchText) => {
      if (!searchText) {
        applyFilter({ parentId: oldParentId || filter.parentId });
      } else {
        oldParentId = filter.parentId;
        applyFilter({ searchText });
      }
    },
    [applyFilter, filter.parentId],
  );

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={(theme) => ({
          marginRight: theme.spacing(2),
          [theme.breakpoints.up("sm")]: {
            display: "none",
          },
        })}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        sx={(theme) => ({
          flexGrow: 1,
          display: "none",
          [theme.breakpoints.up("sm")]: {
            display: "block",
          },
        })}
        variant="h6"
        noWrap
      >
        Dynamic Bookmarks
      </Typography>
      <SearchInput onChange={handleSearchInputChange} />
      <MainNavMenu />
    </Toolbar>
  );
}
