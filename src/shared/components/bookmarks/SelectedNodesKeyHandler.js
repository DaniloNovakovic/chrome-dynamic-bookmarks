import React, { useCallback } from "react";
import { connect } from "react-redux";
import { GlobalHotKeys } from "react-hotkeys";
import {
  selectedNodeIdsSelector,
  filteredNodesSelector,
  copyToClipboard,
  cutToClipboard,
  removeBookmarkNode,
  pasteToBookmarkNode,
  clearSelected,
  setSelected,
  filterSelector,
  clipboardSelector
} from "shared/store";
import { isFolder } from "shared/lib/bookmarkNodes";

const keyMap = {
  COPY: "ctrl+c",
  CUT: "ctrl+x",
  DELETE: "del",
  PASTE: "ctrl+v",
  ESCAPE: ["esc", "escape"],
  SELECT_ALL: "ctrl+a"
};

function SelectedNodesKeyHandler(props) {
  const {
    selectedNodeIds = [],
    filteredNodes = [],
    parentId,
    clipboard = {}
  } = props;

  const copySelected = useCallback(
    () => props.copyToClipboard({ id: selectedNodeIds }),
    [selectedNodeIds]
  );

  const cutSelected = useCallback(
    () => props.cutToClipboard({ id: selectedNodeIds }),
    [selectedNodeIds]
  );

  const removeSelected = useCallback(
    () => props.removeBookmarkNode(selectedNodeIds),
    [selectedNodeIds]
  );

  const pasteClipboard = () => {
    let toParentId = parentId;

    if (selectedNodeIds.length === 1) {
      const selectedNodeId = selectedNodeIds[0];
      const selectedNode = filteredNodes.find(
        node => node.id == selectedNodeId
      );
      if (isFolder(selectedNode)) {
        toParentId = selectedNodeId;
      }
    }

    if (toParentId) {
      props.pasteToBookmarkNode({
        type: clipboard.type,
        from: clipboard.data,
        to: { parentId: toParentId }
      });
    }
  };

  const clearSelected = useCallback(() => props.clearSelected(), []);

  const selectAll = useCallback(
    event => {
      const filteredNodeIds = filteredNodes.map(node => node.id);
      props.setSelected(filteredNodeIds);
      event.preventDefault();
    },
    [filteredNodes]
  );

  const handlers = {
    COPY: copySelected,
    CUT: cutSelected,
    DELETE: removeSelected,
    PASTE: pasteClipboard,
    ESCAPE: clearSelected,
    SELECT_ALL: selectAll
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges={true} />
  );
}

function mapStateToProps(state) {
  const filter = filterSelector(state);
  return {
    parentId: filter.parentId,
    clipboard: clipboardSelector(state),
    selectedNodeIds: selectedNodeIdsSelector(state),
    filteredNodes: filteredNodesSelector(state)
  };
}

export default connect(
  mapStateToProps,
  {
    copyToClipboard,
    cutToClipboard,
    removeBookmarkNode,
    pasteToBookmarkNode,
    clearSelected,
    setSelected
  }
)(SelectedNodesKeyHandler);
