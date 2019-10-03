import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import useDebounce from "shared/lib/hooks";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 200,
      "&:focus": {
        width: 350
      }
    }
  }
}));

export default function SearchInput(props) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchedTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      props.onChange(debouncedSearchedTerm);
    },
    [debouncedSearchedTerm] // Only call effect if debounced search term changes
  );

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={event => setSearchTerm(event.target.value)}
      />
    </div>
  );
}

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired
};
