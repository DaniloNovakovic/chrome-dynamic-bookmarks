import React from "react";
import DefaultIcon from "shared/assets/images/default_favicon.png";
import { getFaviconSrc } from "shared/lib/favicon";

export default function BookmarkIcon({ url, size = 24 }) {
  const faviconSrc = getFaviconSrc({ size, scaleFactor: 1, pageUrl: url });
  const faviconSrc2 = getFaviconSrc({ size, scaleFactor: 2, pageUrl: url });

  return (
    <span
      style={{
        backgroundRepeat: "no-repeat",
        height: `${size}px`,
        width: `${size}px`,
        backgroundImage: `-webkit-image-set(url(${faviconSrc}) 1x, url(${faviconSrc2}) 2x, url(${DefaultIcon}) 1x)`
      }}
    />
  );
}
