/**
 * Sets given properties to bookmarkInfo (falsy values will be ignored)
 * @param {object} props - {
 * title,
 * url,
 * id,
 * parent,
 * parentId,
 * regExp (will untrack if falsy),
 * history
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
  const regExpInfo = document.getElementById('regExp-info');
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';
  if (props.regExp) {
    regExpInfo.textContent = props.regExp;
    if (props.history) {
      for (let url of props.history) {
        historyList.appendChild(li(null, code(null, url)));
      }
    }
    trackedDiv.classList.remove('hide');
  } else {
    trackedDiv.classList.add('hide');
    regExpInfo.textContent = '';
  }
}

/**
 * Returns json object {
 * title,
 * url,
 * id,
 * parent,
 * parentId,
 * regExp,
 * (doesn't return history currently)
 * }
 */
function getInfoData() {
  return {
    title: document.getElementById('title-info').textContent,
    url: document.getElementById('url-info').textContent,
    id: document.getElementById('bookmark-id-info').textContent,
    parent: document.getElementById('parent-title-info').textContent,
    parentId: document.getElementById('parent-id-info').textContent,
    regExp: document.getElementById('regExp-info').textContent
  };
}

function clearBookmarkInfo() {
  setBookmarkInfo({
    title: ' ',
    url: ' ',
    id: ' ',
    parent: ' ',
    parentId: ' ',
    regExp: ' ',
    history: []
  });
}

function showInfoDisplay() {
  document.getElementById('info-display').classList.remove('hide');
}

function hideInfoDisplay() {
  document.getElementById('info-display').classList.add('hide');
}
