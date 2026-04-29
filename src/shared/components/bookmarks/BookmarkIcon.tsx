import React from "react";

import { getFaviconSrc } from "@/shared/lib/favicon";

export default function BookmarkIcon({ url, size = 24 }) {
  const faviconSrc = getFaviconSrc({ size, pageUrl: url });

  return (
    <span
      style={{
        backgroundRepeat: "no-repeat",
        height: `${size}px`,
        width: `${size}px`,
        backgroundImage: `url(${faviconSrc})`,
      }}
    />
  );
}
