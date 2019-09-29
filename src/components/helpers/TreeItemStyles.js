import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
  return {
    children: {
      paddingLeft: theme.spacing(1)
    },
    label: {
      fontWeight: "inherit",
      color: "inherit"
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0.5, 0),
      userSelect: "none",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
        cursor: "pointer"
      },
      "&$selected, &$selected:hover": {
        backgroundColor: theme.palette.action.selected
      }
    },
    labelIcon: {
      marginRight: theme.spacing(1)
    },
    labelText: {
      fontWeight: "inherit",
      flexGrow: 1
    },
    /* Pseudo-class applied to the root element if `selected={true}`. */
    selected: {}
  };
});
