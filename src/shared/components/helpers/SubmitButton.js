import React from "react";
import { Button, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  button: {
    margin: "2em 0"
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
}));

export default function SubmitButton({ className, text = "Submit", ...other }) {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={clsx(classes.button, className)}
      {...other}
    >
      {text}
      <Icon className={clsx(classes.rightIcon, classes.iconSmall)}>send</Icon>
    </Button>
  );
}
