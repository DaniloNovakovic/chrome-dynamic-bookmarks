import { Box, Drawer } from "@mui/material";
import React from "react";

import SideNavContent from "./SideNavContent";

export default function SideNav({
  sx,
  drawerPaperSx,
  direction,
  mobileOpen,
  handleDrawerToggle,
}) {
  return (
    <Box component="nav" sx={sx}>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Drawer
          variant="temporary"
          anchor={direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          slotProps={{
            paper: {
              sx: drawerPaperSx,
            },
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <SideNavContent />
        </Drawer>
      </Box>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Drawer
          slotProps={{
            paper: {
              sx: drawerPaperSx,
            },
          }}
          variant="permanent"
          open
        >
          <SideNavContent />
        </Drawer>
      </Box>
    </Box>
  );
}
