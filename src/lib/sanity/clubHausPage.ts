import {sanityClient} from '@/lib/sanity/client';
import {buildResponsiveImageUrls, type SanityImageSource} from '@/lib/sanity/imageUtils';

export interface ClubHausMenuImageItem {
  id: string;
  mediaType: 'image';
  label: string;
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
}

export interface ClubHausMenuPdfItem {
  id: string;
  mediaType: 'pdf';
  label: string;
  pdfUrl: string;
  pageCount: number;
}

export type ClubHausMenuItem = ClubHausMenuImageItem | ClubHausMenuPdfItem;

export interface ClubHausGalleryPhoto {
  id: string;
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
}

export interface ClubHausPageContent {
  title: string;
  subtitle: string;
  subtitleEmphasis: string;
  menuItems: ClubHausMenuItem[];
  galleryPhotos: ClubHausGalleryPhoto[];
  callToActionText: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
}

interface MenuItemRaw {
  _key?: string;
  mediaType?: 'image' | 'pdf';
  label?: string;
  image?: SanityImageSource;
  mobileImage?: SanityImageSource;
  pdfFile?: {
    asset?: {
      url?: string;
    };
  };
  pdfPageCount?: number;

  // Legacy support
  alt?: string;
  crop?: unknown;
  hotspot?: unknown;
  asset?: unknown;
}

interface GalleryPhotoRaw {
  _key?: string;
  image?: SanityImageSource;
  mobileImage?: SanityImageSource;

  // Legacy support
  alt?: string;
  crop?: unknown;
  hotspot?: unknown;
  asset?: unknown;
}

interface ClubHausPageRaw {
  title?: string;
  subtitle?: unknown;
  subtitleEmphasis?: string;
  menuItems?: MenuItemRaw[];
  galleryPhotos?: GalleryPhotoRaw[];
  callToActionText?: string;
  socialLinks?: Array<{
    platform?: string;
    url?: string;
  }>;

  // Legacy support
  menuImages?: MenuItemRaw[];
  promoLine?: string;
  promoLinkLabel?: string;
  promoLinkUrl?: string;
}

const CLUB_HAUS_PAGE_QUERY = `
  *[_type == "clubHausPage" && _id == "clubHausPage"][0]{
    title,
    subtitle,
    subtitleEmphasis,
    menuItems[]{
      _key,
      mediaType,
      label,
      pdfPageCount,
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
      pdfFile{
        asset->{
          url
        }
      }
    },
    menuImages[]{
      _key,
      alt,
      crop,
      hotspot,
      asset
    },
    galleryPhotos[]{
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
    callToActionText,
    socialLinks[]{
      platform,
      url
    },
    promoLine,
    promoLinkLabel,
    promoLinkUrl
  }
`;

function toPlainText(value: unknown): string {
  if (typeof value === 'string') return value.trim();

  if (Array.isArray(value)) {
    return value
      .map((block) => {
        if (!block || typeof block !== 'object') return '';
        const children = 'children' in block ? block.children : undefined;
        if (!Array.isArray(children)) return '';
        return children
          .map((child) => {
            if (!child || typeof child !== 'object') return '';
            return typeof child.text === 'string' ? child.text : '';
          })
          .join('')
          .trim();
      })
      .filter(Boolean)
      .join(' ')
      .trim();
  }

  return '';
}

function toLegacyImageSource(raw: {alt?: string; crop?: unknown; hotspot?: unknown; asset?: unknown}): SanityImageSource | null {
  if (!raw.asset) return null;

  return {
    alt: raw.alt,
    crop: raw.crop,
    hotspot: raw.hotspot,
    asset: raw.asset,
  };
}

function normalizeMenuItems(raw: ClubHausPageRaw): ClubHausMenuItem[] {
  const sourceMenuItems = raw.menuItems && raw.menuItems.length > 0 ? raw.menuItems : (raw.menuImages ?? []);

  return sourceMenuItems.flatMap((item, index) => {
    const mediaType = item.mediaType ?? 'image';
    const itemId = item._key || `clubhaus-menu-item-${index + 1}`;
    const itemLabel = item.label?.trim() || `Menu Item ${index + 1}`;

    if (mediaType === 'pdf') {
      const pdfUrl = item.pdfFile?.asset?.url?.trim();
      if (!pdfUrl) return [];
      const pageCount = Math.max(1, Math.floor(item.pdfPageCount ?? 1));

      return [{
        id: itemId,
        mediaType: 'pdf' as const,
        label: itemLabel,
        pdfUrl,
        pageCount,
      }];
    }

    const desktopImage = item.image ?? toLegacyImageSource(item);
    const responsiveImage = buildResponsiveImageUrls(
      desktopImage,
      item.mobileImage,
      {width: 1200, height: 1600},
      itemLabel
    );
    if (!responsiveImage.desktopSrc || !responsiveImage.mobileSrc) return [];

    return [{
      id: itemId,
      mediaType: 'image' as const,
      label: itemLabel,
      desktopSrc: responsiveImage.desktopSrc,
      mobileSrc: responsiveImage.mobileSrc,
      alt: responsiveImage.alt,
    }];
  });
}

function normalizeGalleryPhotos(photos: GalleryPhotoRaw[] | undefined): ClubHausGalleryPhoto[] {
  return (photos ?? [])
    .map((photo, index) => {
      const desktopImage = photo.image ?? toLegacyImageSource(photo);
      const responsiveImage = buildResponsiveImageUrls(
        desktopImage,
        photo.mobileImage,
        {width: 1400},
        `Hospitality photo ${index + 1}`
      );
      if (!responsiveImage.desktopSrc || !responsiveImage.mobileSrc) return null;

      return {
        id: photo._key || `clubhaus-photo-${index + 1}`,
        desktopSrc: responsiveImage.desktopSrc,
        mobileSrc: responsiveImage.mobileSrc,
        alt: responsiveImage.alt,
      };
    })
    .filter((photo): photo is ClubHausGalleryPhoto => Boolean(photo));
}

export async function fetchClubHausPageContent(): Promise<ClubHausPageContent | null> {
  if (!sanityClient) return null;

  const raw = await sanityClient.fetch<ClubHausPageRaw | null>(CLUB_HAUS_PAGE_QUERY);
  if (!raw) return null;

  const normalizedSocialLinks = (raw.socialLinks ?? [])
    .map((item) => ({
      platform: item.platform?.trim() || '',
      url: item.url?.trim() || '',
    }))
    .filter((item) => item.platform && item.url);

  if (normalizedSocialLinks.length === 0 && raw.promoLinkUrl?.trim()) {
    normalizedSocialLinks.push({
      platform: 'Instagram',
      url: raw.promoLinkUrl.trim(),
    });
  }

  return {
    title: raw.title?.trim() || '',
    subtitle: toPlainText(raw.subtitle) || '',
    subtitleEmphasis: raw.subtitleEmphasis?.trim() || '',
    menuItems: normalizeMenuItems(raw),
    galleryPhotos: normalizeGalleryPhotos(raw.galleryPhotos),
    callToActionText: raw.callToActionText?.trim() || raw.promoLine?.trim() || '',
    socialLinks: normalizedSocialLinks,
  };
}
