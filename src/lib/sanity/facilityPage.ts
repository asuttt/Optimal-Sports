import {sanityClient} from '@/lib/sanity/client';
import {buildResponsiveImageUrls, type SanityImageSource} from '@/lib/sanity/imageUtils';
import {resolveSanityHexColor, type SanityHexColor} from '@/lib/colorUtils';

export interface FacilityPhoto {
  id: string;
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
}

export interface FacilityPageContent {
  title: string;
  subtitle: string;
  subtitleEmphasis: string;
  amenities: string[];
  amenityPillBackground: string;
  amenityPillBorder: string;
  amenityPillText: string;
  photos: FacilityPhoto[];
}

interface FacilityPhotoRaw {
  _key?: string;
  image?: SanityImageSource;
  mobileImage?: SanityImageSource;

  // Legacy support if array items are raw images.
  alt?: string;
  crop?: unknown;
  hotspot?: unknown;
  asset?: unknown;
}

interface FacilityPageRaw {
  title?: string;
  subtitle?: unknown;
  subtitleEmphasis?: string;
  amenities?: string[];
  amenityPillBackground?: SanityHexColor;
  amenityPillBorder?: SanityHexColor;
  amenityPillText?: SanityHexColor;
  photos?: FacilityPhotoRaw[];
}

const FACILITY_PAGE_QUERY = `
  *[_type == "facilityPage" && _id == "facilityPage"][0]{
    title,
    subtitle,
    subtitleEmphasis,
    amenities,
    amenityPillBackground,
    amenityPillBorder,
    amenityPillText,
    photos[]{
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
    }
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

function toLegacyImageSource(raw: FacilityPhotoRaw): SanityImageSource | null {
  if (!raw.asset) return null;

  return {
    alt: raw.alt,
    crop: raw.crop,
    hotspot: raw.hotspot,
    asset: raw.asset,
  };
}

export async function fetchFacilityPageContent(): Promise<FacilityPageContent | null> {
  if (!sanityClient) return null;

  const raw = await sanityClient.fetch<FacilityPageRaw | null>(FACILITY_PAGE_QUERY);
  if (!raw) return null;

  const photos = (raw.photos ?? [])
    .map((photo, index) => {
      const desktopImage = photo.image ?? toLegacyImageSource(photo);
      const responsiveImage = buildResponsiveImageUrls(
        desktopImage,
        photo.mobileImage,
        {width: 1600, height: 1200},
        `Facility photo ${index + 1}`
      );

      if (!responsiveImage.desktopSrc || !responsiveImage.mobileSrc) return null;

      return {
        id: photo._key || `facility-photo-${index + 1}`,
        desktopSrc: responsiveImage.desktopSrc,
        mobileSrc: responsiveImage.mobileSrc,
        alt: responsiveImage.alt,
      };
    })
    .filter((photo): photo is FacilityPhoto => Boolean(photo));

  return {
    title: raw.title?.trim() || '',
    subtitle: toPlainText(raw.subtitle) || '',
    subtitleEmphasis: raw.subtitleEmphasis?.trim() || '',
    amenities: (raw.amenities ?? []).map((item) => item.trim()).filter(Boolean),
    amenityPillBackground: resolveSanityHexColor(raw.amenityPillBackground, '#ECEAFB'),
    amenityPillBorder: resolveSanityHexColor(raw.amenityPillBorder, '#A197D1'),
    amenityPillText: resolveSanityHexColor(raw.amenityPillText, '#8F85C2'),
    photos,
  };
}
