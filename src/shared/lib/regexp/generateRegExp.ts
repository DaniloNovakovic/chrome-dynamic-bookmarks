import escapeRegExp from "./escape-string";

/**
 * Generates suggested regural expression based on given URL.
 *
 * This is used as helping tool for users to auto-generate URLs
 */
export default function generateRegExp(url: string) {
  if (_isYouTubePlaylist(url)) {
    return _extractYtPlaylist(url);
  } else {
    return _extractDefault(url);
  }
}

function _isYouTubePlaylist(url: string) {
  return /youtube\.com\/.*list=[^&]+/i.test(url);
}

function _extractYtPlaylist(url: string) {
  const regExpString = url.match(/list=[^&]+/i)[0];
  return escapeRegExp(`youtube.com/`) + ".*" + escapeRegExp(regExpString || "");
}

function _extractDefault(url: string) {
  return escapeRegExp(
    url.replace(
      /(^(http[s]?:\/\/)?(www\.)?)|(\/[^/]*?(\?.*)?$)|(\/[^/?]+\/$)/g,
      "",
    ),
  );
}
