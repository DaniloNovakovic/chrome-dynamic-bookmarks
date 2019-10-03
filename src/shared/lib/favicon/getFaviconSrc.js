import { queryStringify } from "../query";

export default function getFaviconSrc({ size, scaleFactor, pageUrl }) {
  const scale_factor = _formatScaleFactor(scaleFactor);
  return `chrome://favicon/size/${size}@${scale_factor}/${pageUrl}`;
}

export function getFavicon2Src({ size, scaleFactor, pageUrl }) {
  const queryString = queryStringify({
    size,
    scale_factor: _formatScaleFactor(scaleFactor),
    page_url: _formatPageUrl(pageUrl),
    allow_google_server_fallback: 0
  });

  return `chrome://favicon2/?${queryString}`;
}

function _formatScaleFactor(scaleFactor) {
  if (typeof scaleFactor === "number") {
    return `${scaleFactor}x`;
  }
  return scaleFactor;
}

function _formatPageUrl(url = "") {
  return encodeURIComponent(url);
}
