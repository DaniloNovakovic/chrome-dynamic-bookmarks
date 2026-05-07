import { Box } from "@mui/material";
import React from "react";

import { BookmarkTreeView } from "@/shared/components/bookmarks";

export default function SideNavContent() {
  return (
    <div>
      <Box sx={(theme) => theme.mixins.toolbar} />
      <BookmarkTreeView
        sx={(theme) => ({
          marginTop: theme.spacing(1),
          height: 216,
          flexGrow: 1,
          maxWidth: 400,
        })}
      />
    </div>
  );
}
