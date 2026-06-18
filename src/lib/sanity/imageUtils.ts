import {urlForSanityImage} from '@/lib/sanity/client';

export interface SanityImageSource {
  asset?: unknown;
  crop?: unknown;
  hotspot?: unknown;
  alt?: string;
}

export interface ResponsiveImageUrls {
  desktopSrc: string | null;
  mobileSrc: string | null;
  alt: string;
}

interface BuildImageOptions {
  width: number;
  height?: number;
}

export function buildImageUrl(source: SanityImageSource | null | undefined, options: BuildImageOptions) {
  if (!source?.asset) return null;

  const builder = urlForSanityImage(source)?.width(options.width);
  if (!builder) return null;

  if (typeof options.height === 'number') {
    return builder.height(options.height).fit('crop').auto('format').url() ?? null;
  }

  // Width-only URL avoids forcing an additional ratio crop when the frontend frame is layout-driven.
  return builder.fit('max').auto('format').url() ?? null;
}

export function buildResponsiveImageUrls(
  desktopImage: SanityImageSource | null | undefined,
  mobileImage: SanityImageSource | null | undefined,
  options: BuildImageOptions,
  fallbackAlt: string
): ResponsiveImageUrls {
  const desktopSrc = buildImageUrl(desktopImage, options);
  const mobileSrc = buildImageUrl(mobileImage, options) ?? desktopSrc;
  const alt = desktopImage?.alt?.trim() || mobileImage?.alt?.trim() || fallbackAlt;

  return {
    desktopSrc,
    mobileSrc,
    alt,
  };
}
