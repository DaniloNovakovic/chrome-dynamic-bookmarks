import Tab from "@mui/material/Tab";
import React from "react";

export default function LinkTab(props) {
  return (
    <Tab
      onClick={(event) => {
        if (props.target !== "_blank") {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}
