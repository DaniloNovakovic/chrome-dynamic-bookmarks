import { Box, CssBaseline } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

import {
  ActionMenuProvider,
  DialogProvider,
} from "@/shared/components/bookmarks";
import SelectedNodesKeyHandler from "@/shared/components/bookmarks/SelectedNodesKeyHandler";
import { StatusSnackbar } from "@/shared/components/helpers";

import MainNav from "./MainNav";
import MainSection from "./MainSection";
import SideNav from "./SideNav";

export default function Manager() {
  const [drawerWidth] = React.useState(240);
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <DialogProvider>
      <ActionMenuProvider>
        <CssBaseline />
        <StatusSnackbar />
        <SelectedNodesKeyHandler />
        <Box sx={{ display: "flex" }}>
          <MainNav
            sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
          />
          <SideNav
            sx={(theme) => ({
              [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
                flexShrink: 0,
              },
            })}
            drawerPaperSx={{ width: drawerWidth }}
            direction={theme.direction}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <MainSection
            sx={(theme) => ({
              flexGrow: 1,
              minHeight: "100vh",
              padding: theme.spacing(3, 4),
              [theme.breakpoints.up("sm")]: {
                width: `calc(100% - ${drawerWidth}px)`,
              },
              [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(3, 8),
              },
            })}
          />
        </Box>
      </ActionMenuProvider>
    </DialogProvider>
  );
}
