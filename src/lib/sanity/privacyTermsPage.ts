import {sanityClient} from '@/lib/sanity/client';

export interface PortableTextSpan {
  _type: 'span';
  _key?: string;
  text?: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: 'block';
  _key?: string;
  style?: string;
  listItem?: 'bullet';
  level?: number;
  children?: PortableTextSpan[];
}

export interface PrivacyTermsPageContent {
  title: string;
  subtitle: string;
  privacyTitle: string;
  privacyContent: PortableTextBlock[];
  termsTitle: string;
  termsContent: PortableTextBlock[];
}

interface PrivacyTermsPageRaw {
  title?: string;
  subtitle?: string;
  privacyTitle?: string;
  privacyContent?: PortableTextBlock[];
  termsTitle?: string;
  termsContent?: PortableTextBlock[];
}

const PRIVACY_TERMS_PAGE_QUERY = `
  *[_type == "privacyTermsPage" && _id == "privacyTermsPage"][0]{
    title,
    subtitle,
    privacyTitle,
    privacyContent,
    termsTitle,
    termsContent
  }
`;

function normalizePortableText(value: PortableTextBlock[] | undefined): PortableTextBlock[] {
  if (!Array.isArray(value)) return [];
  return value.filter((block): block is PortableTextBlock => block?._type === 'block');
}

export async function fetchPrivacyTermsPageContent(): Promise<PrivacyTermsPageContent | null> {
  if (!sanityClient) return null;

  const raw = await sanityClient.fetch<PrivacyTermsPageRaw | null>(PRIVACY_TERMS_PAGE_QUERY);
  if (!raw) return null;

  return {
    title: raw.title?.trim() || 'Privacy & Terms',
    subtitle: raw.subtitle?.trim() || 'Effective date: TBU',
    privacyTitle: raw.privacyTitle?.trim() || 'Privacy Policy',
    privacyContent: normalizePortableText(raw.privacyContent),
    termsTitle: raw.termsTitle?.trim() || 'Terms & Conditions',
    termsContent: normalizePortableText(raw.termsContent),
  };
}
