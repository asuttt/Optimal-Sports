export function isAppleMapsPlatform() {
  if (typeof navigator === 'undefined') return false;

  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isMac = platform.includes('mac');
  const isIPadOSDesktopMode = isMac && navigator.maxTouchPoints > 1;

  return isIOS || isMac || isIPadOSDesktopMode;
}

export function getMapUrls(address: string, appleMapsUrl?: string) {
  const query = encodeURIComponent(address);

  return {
    apple: appleMapsUrl ?? `https://maps.apple.com/?q=${query}`,
    google: `https://maps.google.com/?q=${query}`,
  };
}

export function openAppleMapsOnApplePlatform(
  event: React.MouseEvent<HTMLAnchorElement>,
  address: string,
  appleMapsUrl?: string
) {
  if (!isAppleMapsPlatform()) return;

  event.preventDefault();
  window.location.assign(getMapUrls(address, appleMapsUrl).apple);
}
