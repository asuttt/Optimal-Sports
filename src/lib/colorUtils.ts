const HEX_COLOR_PATTERN = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export type SanityHexColor = string | { hex?: string } | null | undefined;

function normalizeHexColor(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const prefixed = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
  if (!HEX_COLOR_PATTERN.test(prefixed)) return null;

  if (prefixed.length === 4) {
    const [, r, g, b] = prefixed;
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }

  return prefixed.toUpperCase();
}

function channelToLinear(channel: number): number {
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

export function resolveSanityHexColor(value: SanityHexColor, fallback = ''): string {
  if (typeof value === 'string') {
    return normalizeHexColor(value) ?? fallback;
  }

  if (value && typeof value === 'object' && typeof value.hex === 'string') {
    return normalizeHexColor(value.hex) ?? fallback;
  }

  return fallback;
}

export function getContrastingTextColor(backgroundHex: string): '#000000' | '#FFFFFF' {
  const normalized = normalizeHexColor(backgroundHex);
  if (!normalized) return '#FFFFFF';

  const raw = normalized.slice(1);
  const r = parseInt(raw.slice(0, 2), 16) / 255;
  const g = parseInt(raw.slice(2, 4), 16) / 255;
  const b = parseInt(raw.slice(4, 6), 16) / 255;

  const luminance =
    0.2126 * channelToLinear(r) +
    0.7152 * channelToLinear(g) +
    0.0722 * channelToLinear(b);

  const contrastWithWhite = (1.05 + 0) / (luminance + 0.05);
  const contrastWithBlack = (luminance + 0.05) / 0.05;

  return contrastWithBlack >= contrastWithWhite ? '#000000' : '#FFFFFF';
}

export function withHexAlpha(backgroundHex: string, alpha: number, fallback = 'rgba(0, 0, 0, 1)'): string {
  const normalized = normalizeHexColor(backgroundHex);
  if (!normalized) return fallback;

  const clampedAlpha = Math.max(0, Math.min(1, alpha));
  const raw = normalized.slice(1);
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
}
