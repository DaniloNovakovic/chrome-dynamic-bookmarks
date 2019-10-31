export function getAnchorPosition(event) {
  return {
    anchorReference: "anchorPosition",
    anchorPosition: {
      top: event.clientY,
      left: event.clientX
    }
  };
}

export function getAnchorElement(event) {
  return { anchorEl: event.currentTarget };
}
