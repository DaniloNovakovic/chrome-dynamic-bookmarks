import escapeRegExp from "./escape-string";

export default function generateRegExp(url) {
  let regExpString = "";
  if (_isYouTubePlaylist(url)) {
    regExpString = _extractYtPlaylist(url);
  } else {
    regExpString = _extractDefault(url);
  }
  return escapeRegExp(regExpString);
}

function _isYouTubePlaylist(url) {
  return /youtube\.com\/.*list=[^&]+/i.test(url);
}

function _extractYtPlaylist(url) {
  const regExpString = url.match(/list=[^&]+/i);
  return `youtube.com/.*${regExpString}`;
}

function _extractDefault(url) {
  return url.replace(
    /(^(http[s]?:\/\/)?(www\.)?)|(\/[^/]*?(\?.*)?$)|(\/[^/?]+\/$)/g,
    ""
  );
}
