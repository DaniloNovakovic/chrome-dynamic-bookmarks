import Tab from "@material-ui/core/Tab";
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
