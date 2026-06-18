const MINDBODY_HOST_FRAGMENT = 'mindbodyonline.com';

function getMindbodyStudioId() {
  return import.meta.env.VITE_MINDBODY_STUDIO_ID?.trim() || '';
}

function parseExternalUrl(rawUrl: string) {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    return new URL(trimmed);
  } catch {
    // Support host-only values accidentally pasted without protocol.
    if (/^clients\.mindbodyonline\.com/i.test(trimmed)) {
      try {
        return new URL(`https://${trimmed}`);
      } catch {
        return null;
      }
    }

    return null;
  }
}

export function normalizeExternalUrl(rawUrl: string) {
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';

  const parsed = parseExternalUrl(trimmed);
  if (!parsed) return trimmed;

  if (parsed.hostname.toLowerCase().includes(MINDBODY_HOST_FRAGMENT)) {
    const studioId = getMindbodyStudioId();
    if (studioId && !parsed.searchParams.get('studioid')) {
      parsed.searchParams.set('studioid', studioId);
    }
  }

  return parsed.toString();
}
