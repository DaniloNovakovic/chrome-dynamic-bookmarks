/**
 * Sorts children of html element with given `id`
 * @param {string} id - id of html element whose children will be sorted
 * @param {function} callback - `true` if elements should swap, `false` if not (default: ascending)
 */
export default function sortList(id, callback) {
  if (typeof id != 'string') {
    return console.warn(
      `failed to sort list ${id} (reason: invalid parameter listId)`
    );
  }
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById(id);
  switching = true;

  while (switching) {
    switching = false;
    b = list.children;

    for (i = 0; i < b.length - 1; i++) {
      shouldSwitch = false;
      /* Check if the next item should
      switch place with the current item: */
      if (typeof callback == 'function') {
        shouldSwitch = !!callback(b[i], b[i + 1]);
        break;
      } else {
        shouldSwitch =
          b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase();
        break;
      }
    }

    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark the switch as done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}
