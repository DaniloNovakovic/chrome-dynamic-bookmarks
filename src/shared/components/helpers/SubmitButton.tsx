import { Button, ButtonProps, Icon } from "@mui/material";
import React from "react";

type SubmitButtonProps = ButtonProps & {
  text?: string;
};

export default function SubmitButton({
  className,
  text = "Submit",
  ...other
}: SubmitButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      className={className}
      sx={{ margin: "2em 0" }}
      {...other}
    >
      {text}
      <Icon sx={(theme) => ({ marginLeft: theme.spacing(1), fontSize: 20 })}>
        send
      </Icon>
    </Button>
  );
}
