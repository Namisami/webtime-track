export function browserDetect() {
  const userAgent = navigator.userAgent;

  const isChrome = userAgent.includes("Chrome") && !userAgent.includes("OPR");
  const isFirefox = userAgent.includes("Firefox");
  const isSafari = userAgent.includes("Safari") && !userAgent.includes("Chrome");
  const isIE = userAgent.includes("MSIE") || userAgent.includes("rv:");
  const isOpera = userAgent.includes("OPR");

  return {
      chrome: isChrome,
      firefox: isFirefox,
      safari: isSafari,
      ie: isIE,
      opera: isOpera
  };
};
