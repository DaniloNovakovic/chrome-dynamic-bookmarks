import { Box, Breadcrumbs, Link, Paper } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

import { applyFilter as applyFilterAction } from "@/shared/store/actions";
import { breadcrumbsSelector } from "@/shared/store/selectors/index";

export function BookmarkBreadcrumbs(props) {
  const { breadcrumbs = [], applyFilter, className, ...other } = props;

  const items = breadcrumbs.map((node, index) => {
    return (
      <Link
        color={index == breadcrumbs.length - 1 ? "text.primary" : "inherit"}
        key={node.id}
        href="#"
        onClick={(event) => {
          event.preventDefault();
          if (applyFilter) {
            applyFilter({ parentId: node.id });
          }
        }}
      >
        {node.title}
      </Link>
    );
  });

  return items.length == 0 ? (
    <div />
  ) : (
    <Box
      className={className}
      sx={{ justifyContent: "center", flexWrap: "wrap" }}
      {...other}
    >
      <Paper elevation={0} sx={(theme) => ({ padding: theme.spacing(1, 2) })}>
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          itemsAfterCollapse={3}
          maxItems={5}
        >
          {items}
        </Breadcrumbs>
      </Paper>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    breadcrumbs: breadcrumbsSelector(state),
  };
}

export default connect(mapStateToProps, { applyFilter: applyFilterAction })(
  BookmarkBreadcrumbs,
);
