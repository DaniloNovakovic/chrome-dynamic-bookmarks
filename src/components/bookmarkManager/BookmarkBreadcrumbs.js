import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { applyFilter as applyFilterAction } from "store/actions/bookmarkNodesActions";
import Link from "@material-ui/core/Link";
import { breadcrumbsSelector } from "store/selectors/index";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center",
    flexWrap: "wrap"
  },
  paper: {
    padding: theme.spacing(1, 2)
  }
}));

export function BookmarkBreadcrumbs(props) {
  const classes = useStyles();
  const { breadcrumbs = [], applyFilter, className, ...other } = props;

  const items = breadcrumbs.map((node, index) => {
    return (
      <Link
        color={index == breadcrumbs.length - 1 ? "textPrimary" : "inherit"}
        key={node.id}
        href="#"
        onClick={event => {
          event.preventDefault();
          applyFilter && applyFilter({ parentId: node.id });
        }}
      >
        {node.title}
      </Link>
    );
  });

  return items.length == 0 ? (
    <div />
  ) : (
    <div className={clsx(classes.root, className)} {...other}>
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          itemsAfterCollapse={3}
          maxItems={5}
        >
          {items}
        </Breadcrumbs>
      </Paper>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    breadcrumbs: breadcrumbsSelector(state)
  };
}

export default connect(
  mapStateToProps,
  { applyFilter: applyFilterAction }
)(BookmarkBreadcrumbs);
