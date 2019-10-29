/**
 * Sets "text/plain" data on `event.dataTransfer` with passed `data` and empty ghost drag image
 */
export function setDragTextData(event, data) {
  const dragImg = new Image(0, 0);
  dragImg.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  event.dataTransfer.setDragImage(dragImg, 0, 0);
  event.dataTransfer.setData("text/plain", data);
  event.dataTransfer.effectAllowed = "move";
}

/**
 * Calls `event.preventDefault`, also sets `dropEffect` to passed value ("move" by default).
 * This function should be used in `onDragOver` event.
 */
export function allowDrop(event, dropEffect = "move") {
  event.preventDefault();
  event.dataTransfer.dropEffect = dropEffect;
}
