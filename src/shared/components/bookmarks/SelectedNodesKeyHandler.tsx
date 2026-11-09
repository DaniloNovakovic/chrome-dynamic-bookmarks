import { useCallback, useEffect } from "react";
import { connect } from "react-redux";

import { isFolder } from "@/shared/lib/bookmarkNodes";
import {
  clearSelected,
  clipboardSelector,
  copyToClipboard,
  cutToClipboard,
  filteredNodesSelector,
  filterSelector,
  pasteToBookmarkNode,
  removeBookmarkNode,
  selectedNodeIdsSelector,
  setSelected,
} from "@/shared/store";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

function SelectedNodesKeyHandler(props) {
  const {
    selectedNodeIds = [],
    filteredNodes = [],
    parentId,
    clipboard = {},
    copyToClipboard,
    cutToClipboard,
    removeBookmarkNode,
    pasteToBookmarkNode,
    clearSelected,
    setSelected,
  } = props;

  const copySelected = useCallback(
    () => copyToClipboard({ id: selectedNodeIds }),
    [copyToClipboard, selectedNodeIds],
  );

  const cutSelected = useCallback(
    () => cutToClipboard({ id: selectedNodeIds }),
    [cutToClipboard, selectedNodeIds],
  );

  const removeSelected = useCallback(
    () => removeBookmarkNode(selectedNodeIds),
    [removeBookmarkNode, selectedNodeIds],
  );

  const pasteClipboard = useCallback(() => {
    let toParentId = parentId;
    const firstSelectedNode =
      findById(filteredNodes, firstOrDefault(selectedNodeIds)) || {};

    if (selectedNodeIds.length === 1) {
      if (isFolder(firstSelectedNode)) {
        toParentId = firstSelectedNode.id;
      }
    }
    if (toParentId) {
      pasteToBookmarkNode({
        type: clipboard.type,
        from: clipboard.data,
        to: { parentId: toParentId },
      });
    }
  }, [
    parentId,
    filteredNodes,
    selectedNodeIds,
    clipboard,
    pasteToBookmarkNode,
  ]);

  const clearSelectedHandler = useCallback(
    () => clearSelected(),
    [clearSelected],
  );

  const selectAll = useCallback(
    (event) => {
      const filteredNodeIds = filteredNodes.map((node) => node.id);
      setSelected(filteredNodeIds);
      event.preventDefault();
    },
    [filteredNodes, setSelected],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }

      const key = event.key.toLowerCase();
      const isPrimaryModifier = event.ctrlKey || event.metaKey;

      if (isPrimaryModifier && key === "c") {
        event.preventDefault();
        copySelected();
        return;
      }

      if (isPrimaryModifier && key === "x") {
        event.preventDefault();
        cutSelected();
        return;
      }

      if (isPrimaryModifier && key === "v") {
        event.preventDefault();
        pasteClipboard();
        return;
      }

      if (isPrimaryModifier && key === "a") {
        selectAll(event);
        return;
      }

      if (key === "delete") {
        event.preventDefault();
        removeSelected();
        return;
      }

      if (key === "escape" || key === "esc") {
        clearSelectedHandler();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    clearSelectedHandler,
    copySelected,
    cutSelected,
    pasteClipboard,
    removeSelected,
    selectAll,
  ]);

  return null;
}

function firstOrDefault(arr = [], defaultVal = "") {
  return arr.length === 0 ? defaultVal : arr[0];
}

function findById(filteredNodes, selectedNodeId) {
  return filteredNodes.find((node) => node.id == selectedNodeId);
}

function mapStateToProps(state) {
  const filter = filterSelector(state);
  return {
    parentId: filter.parentId,
    clipboard: clipboardSelector(state),
    selectedNodeIds: selectedNodeIdsSelector(state),
    filteredNodes: filteredNodesSelector(state),
  };
}

export default connect(mapStateToProps, {
  copyToClipboard,
  cutToClipboard,
  removeBookmarkNode,
  pasteToBookmarkNode,
  clearSelected,
  setSelected,
})(SelectedNodesKeyHandler);
