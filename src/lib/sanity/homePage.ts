import {sanityClient, urlForSanityImage} from '@/lib/sanity/client';
import type {SanityImageSource} from '@/lib/sanity/imageUtils';
import {normalizeExternalUrl} from '@/lib/externalUrl';
import {resolveSanityHexColor, type SanityHexColor} from '@/lib/colorUtils';

export interface HomePhoto {
  id: string;
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  isCmsManaged?: boolean;
}

export interface HomeLineItem {
  label: string;
  value: string;
}

export interface HomeSocialLink {
  platform: string;
  url: string;
}

export interface HomePageContent {
  heroPhotos: HomePhoto[];
  announcement: {
    enabled: boolean;
    displayMode: 'banner' | 'floating';
    title: string;
    message: string;
    linkLabel: string;
    linkUrl: string;
    buttonColor: string;
    buttonTextColor: string;
    signature: string;
  } | null;
  hours: HomeLineItem[];
  addressLines: string[];
  phone: string;
  email: string;
  socialLinks: HomeSocialLink[];
}

interface HomePageSanityRaw {
  heroPhotos?: Array<{
    _key?: string;
    image?: SanityImageSource;
    mobileImage?: SanityImageSource;

    // Legacy support for previously stored image-only items.
    alt?: string;
    crop?: unknown;
    hotspot?: unknown;
    asset?: unknown;
  }>;
  hours?: Array<{
    label?: string;
    value?: string;
  }>;
  announcement?: {
    enabled?: boolean;
    displayMode?: 'banner' | 'floating' | 'modal';
    title?: string;
    message?: string;
    linkLabel?: string;
    linkUrl?: string;
    buttonColor?: SanityHexColor;
    buttonTextColor?: SanityHexColor;
  };
  addressLines?: string[];
  phone?: string;
  email?: string;
  socialLinks?: Array<{
    platform?: string;
    url?: string;
  }>;
}

const HOME_PAGE_QUERY = `
  *[_type == "homePage" && _id == "homePage"][0]{
    heroPhotos[]{
      _key,
      image{
        alt,
        crop,
        hotspot,
        asset
      },
      mobileImage{
        alt,
        crop,
        hotspot,
        asset
      },
      alt,
      crop,
      hotspot,
      asset
    },
    hours[]{
      label,
      value
    },
    announcement{
      enabled,
      displayMode,
      title,
      message,
      linkLabel,
      linkUrl,
      buttonColor,
      buttonTextColor
    },
    addressLines,
    phone,
    email,
    socialLinks[]{
      platform,
      url
    }
  }
`;

export async function fetchHomePageContent(): Promise<HomePageContent | null> {
  if (!sanityClient) return null;

  const raw = await sanityClient.fetch<HomePageSanityRaw | null>(HOME_PAGE_QUERY);
  if (!raw) return null;

  const heroPhotos = (raw.heroPhotos ?? [])
    .map((photo, index) => {
      const legacyImage = photo.asset
        ? {
            alt: photo.alt,
            crop: photo.crop,
            hotspot: photo.hotspot,
            asset: photo.asset,
          }
        : null;

      const desktopImage = photo.image ?? legacyImage;
      const desktopUrl = desktopImage?.asset
        ? urlForSanityImage(desktopImage)
            ?.width(1920)
            .height(1200)
            .fit('crop')
            .auto('format')
            .url()
        : null;
      const mobileUrl = photo.mobileImage?.asset
        ? urlForSanityImage(photo.mobileImage)
            ?.width(1920)
            .height(1200)
            .fit('crop')
            .auto('format')
            .url()
        : desktopUrl;
      if (!desktopUrl || !mobileUrl) return null;
      return {
        id: `home-slide-${index + 1}`,
        desktopSrc: desktopUrl,
        mobileSrc: mobileUrl,
        alt: desktopImage?.alt?.trim() || photo.mobileImage?.alt?.trim() || `Homepage photo ${index + 1}`,
        isCmsManaged: true,
      };
    })
    .filter((photo): photo is HomePhoto => Boolean(photo));

  return {
    heroPhotos,
    announcement:
      raw.announcement?.enabled && raw.announcement?.message?.trim()
        ? {
            enabled: true,
            displayMode:
              raw.announcement.displayMode === 'modal'
                ? 'floating'
                : raw.announcement.displayMode ?? 'banner',
            title: raw.announcement.title?.trim() ?? '',
            message: raw.announcement.message.trim(),
            linkLabel: raw.announcement.linkLabel?.trim() ?? '',
            linkUrl: normalizeExternalUrl(raw.announcement.linkUrl?.trim() ?? ''),
            buttonColor: resolveSanityHexColor(raw.announcement.buttonColor, '#749B26'),
            buttonTextColor: resolveSanityHexColor(raw.announcement.buttonTextColor, '#FFFFFF'),
            signature: [
              raw.announcement.displayMode === 'modal'
                ? 'floating'
                : raw.announcement.displayMode ?? 'banner',
              raw.announcement.title?.trim() ?? '',
              raw.announcement.message.trim(),
              raw.announcement.linkLabel?.trim() ?? '',
              raw.announcement.linkUrl?.trim() ?? '',
              resolveSanityHexColor(raw.announcement.buttonColor, '#749B26'),
              resolveSanityHexColor(raw.announcement.buttonTextColor, '#FFFFFF'),
            ].join('|'),
          }
        : null,
    hours: (raw.hours ?? []).filter((item): item is HomeLineItem => Boolean(item?.label && item?.value)),
    addressLines: raw.addressLines ?? [],
    phone: raw.phone?.trim() ?? '',
    email: raw.email?.trim() ?? '',
    socialLinks: (raw.socialLinks ?? []).filter(
      (item): item is HomeSocialLink => Boolean(item?.platform && item?.url)
    ),
  };
}
