import {sanityClient} from '@/lib/sanity/client';
import {buildImageUrl, type SanityImageSource} from '@/lib/sanity/imageUtils';

export interface OurStoryPageContent {
  title: string;
  subtitle: string;
  subtitleEmphasis: string;
  featureImage: {
    desktopSrc: string;
    mobileSrc: string;
    alt: string;
  } | null;
}

interface OurStoryPageRaw {
  title?: string;
  subtitle?: unknown;
  subtitleEmphasis?: string;
  featureImages?: Array<{
    image?: SanityImageSource;
    mobileImage?: SanityImageSource;
  }>;
}

const OUR_STORY_PAGE_QUERY = `
  *[_type == "ourStoryPage" && _id == "ourStoryPage"][0]{
    title,
    subtitle,
    subtitleEmphasis,
    featureImages[]{
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
      }
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
      .join('\n\n')
      .trim();
  }

  return '';
}

export async function fetchOurStoryPageContent(): Promise<OurStoryPageContent | null> {
  if (!sanityClient) return null;

  const raw = await sanityClient.fetch<OurStoryPageRaw | null>(OUR_STORY_PAGE_QUERY);
  if (!raw) return null;

  const primaryFeatureImage = raw.featureImages?.[0];
  const desktopSrc = buildImageUrl(primaryFeatureImage?.image, {width: 1600, height: 1600});
  const mobileSrc =
    buildImageUrl(primaryFeatureImage?.mobileImage, {width: 1200, height: 1500}) ?? desktopSrc;
  const alt =
    primaryFeatureImage?.image?.alt?.trim() ||
    primaryFeatureImage?.mobileImage?.alt?.trim() ||
    'Our Story feature image';

  return {
    title: raw.title?.trim() || '',
    subtitle: toPlainText(raw.subtitle) || '',
    subtitleEmphasis: raw.subtitleEmphasis?.trim() || '',
    featureImage: desktopSrc && mobileSrc ? {desktopSrc, mobileSrc, alt} : null,
  };
}
