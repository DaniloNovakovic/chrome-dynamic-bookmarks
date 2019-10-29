export function getAnchorPosition(event) {
  return {
    anchorReference: "anchorPosition",
    anchorPosition: {
      top: event.pageY,
      left: event.pageX
    }
  };
}

export function getAnchorElement(event) {
  return { anchorEl: event.currentTarget };
}
