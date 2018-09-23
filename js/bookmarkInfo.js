/**
 *
 * @param {object} props - {
 * title,
 * url,
 * id,
 * parent,
 * parentId,
 * regExp,
 * history,
 * buttonsEnabled - false (default)
 * }
 */
function setBookmarkInfo(props) {
  if (props.title) {
    document.getElementById('title-info').textContent = props.title;
  }
  if (props.url) {
    document.getElementById('url-info').textContent = props.url;
  }
  if (props.parent) {
    document.getElementById('parent-title-info').textContent = props.parent;
  }
  if (props.id) {
    document.getElementById('bookmark-id-info').textContent = props.id;
  }
  if (props.parentId) {
    document.getElementById('parent-id-info').textContent = props.parentId;
  }

  const trackedDiv = document.getElementById('tracked');
  if (props.regExp) {
    document.getElementById('regExp-info').textContent = props.regExp;

    if (props.historyList) {
      const historyList = document.getElementById('history-list');
      historyList.innerHTML = '';
      for (let url of props.history) {
        historyList.appendChild(li(null, code(null, url)));
      }
    }
    trackedDiv.classList.remove('hide');
  } else if (!trackedDiv.classList.contains('hide')) {
    trackedDiv.classList.add('hide');
  }

  if (props.buttonsEnabled) {
    enableFooterButtons();
  }
}
