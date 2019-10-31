import React from "react";
import { connect } from "react-redux";
import { List } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { filteredNodeIdsSelector } from "shared/store/selectors/index";
import { ActionMenuContext } from "../actionMenus";
import NodeListItem from "./NodeListItem";

export function BookmarkNodeList(props) {
  const { filteredNodeIds = [] } = props;
  const { openActionMenu } = React.useContext(ActionMenuContext);
  const theme = useTheme();

  const items = filteredNodeIds.map(nodeId => {
    return (
      <NodeListItem
        key={nodeId}
        nodeId={nodeId}
        iconSize={theme.iconSize}
        openActionMenu={openActionMenu}
      />
    );
  });

  return (
    <List aria-label="main bookmark list" dense>
      {items}
    </List>
  );
}

function mapStateToProps(state) {
  return {
    filteredNodeIds: filteredNodeIdsSelector(state)
  };
}

export default connect(mapStateToProps)(BookmarkNodeList);
