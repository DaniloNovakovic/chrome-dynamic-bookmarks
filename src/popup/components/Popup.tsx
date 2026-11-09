import { Box, CssBaseline } from "@mui/material";
import React, { useState } from "react";

import { TabPanel } from "@/shared/components/helpers";
import { GenericFunction } from "@/shared/types";

import AddBookmarkForm from "./AddBookmarkForm";
import NavTabs from "./NavTabs";

const Popup = () => {
  const [value, setValue] = useState(0);

  const handleChange: GenericFunction = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <CssBaseline />
      <NavTabs value={value} onChange={handleChange}></NavTabs>
      <TabPanel value={value} index={0}>
        <AddBookmarkForm />
      </TabPanel>
    </Box>
  );
};

export default Popup;
