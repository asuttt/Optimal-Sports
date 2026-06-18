import {sanityClient} from '@/lib/sanity/client';
import {resolveSanityHexColor, type SanityHexColor} from '@/lib/colorUtils';
import {normalizeExternalUrl} from '@/lib/externalUrl';

export interface MembershipLineItem {
  label: string;
  value: string;
}

export interface MembershipsPageContent {
  title: string;
  subtitle: string;
  subtitleEmphasis: string;
  leftBoxTitle: string;
  leftBoxSubtitle: string;
  leftBoxPlans: MembershipLineItem[];
  rightBoxTitle: string;
  rightBoxSubtitle: string;
  rightBoxPlans: MembershipLineItem[];
  callToActionText: string;
  callToActionEmail: string;
  signupLabel: string;
  signupUrl: string;
  signupButtonColor: string;
  signupButtonTextColor: string;
}

interface MembershipsPageSanityRaw {
  title?: string;
  subtitle?: string;
  subtitleEmphasis?: string;
  leftBoxTitle?: string;
  leftBoxSubtitle?: string;
  leftBoxPlans?: Array<{
    label?: string;
    value?: string;
  }>;
  rightBoxTitle?: string;
  rightBoxSubtitle?: string;
  rightBoxPlans?: Array<{
    label?: string;
    value?: string;
  }>;
  callToActionText?: string;
  callToActionEmail?: string;

  // Kept for backward compatibility with already-entered content.
  dropInTitle?: string;
  dropInSubtitle?: string;
  dropInPlans?: Array<{
    label?: string;
    value?: string;
  }>;
  dropInSingleValue?: string;
  dropInPack10Value?: string;
  monthlyTitle?: string;
  monthlySubtitle?: string;
  monthlyPlans?: Array<{
    label?: string;
    value?: string;
  }>;
  orientationLine1?: string;
  orientationLine2?: string;
  // Backward compatibility with previously saved single-line orientation field.
  orientationText?: string;
  orientationEmail?: string;
  signupLabel?: string;
  signupUrl?: string;
  signupButtonColor?: SanityHexColor;
  signupButtonTextColor?: SanityHexColor;
}

const MEMBERSHIPS_PAGE_QUERY = `
  *[_type == "membershipsPage" && _id == "membershipsPage"][0]{
    title,
    subtitle,
    subtitleEmphasis,
    leftBoxTitle,
    leftBoxSubtitle,
    leftBoxPlans[]{
      label,
      value
    },
    rightBoxTitle,
    rightBoxSubtitle,
    rightBoxPlans[]{
      label,
      value
    },
    dropInTitle,
    dropInSubtitle,
    dropInPlans[]{
      label,
      value
    },
    dropInSingleValue,
    dropInPack10Value,
    monthlyTitle,
    monthlySubtitle,
    monthlyPlans[]{
      label,
      value
    },
    callToActionText,
    callToActionEmail,
    orientationLine1,
    orientationLine2,
    orientationText,
    orientationEmail,
    signupLabel,
    signupUrl,
    signupButtonColor,
    signupButtonTextColor
  }
`;

export async function fetchMembershipsPageContent(): Promise<MembershipsPageContent | null> {
  if (!sanityClient) return null;

  const raw = await sanityClient.fetch<MembershipsPageSanityRaw | null>(MEMBERSHIPS_PAGE_QUERY);
  if (!raw) return null;

  const legacyOrientationText = raw.orientationText?.trim() ?? '';
  const orientationLine1 = raw.orientationLine1?.trim() ?? '';
  const orientationLine2 = raw.orientationLine2?.trim() ?? '';
  let derivedCtaText = '';

  if (raw.callToActionText?.trim()) {
    derivedCtaText = raw.callToActionText.trim();
  } else if (orientationLine1 && orientationLine2) {
    derivedCtaText = `${orientationLine1}\n${orientationLine2}`;
  } else if (orientationLine1 || orientationLine2) {
    derivedCtaText = orientationLine1 || orientationLine2;
  } else if (legacyOrientationText) {
    const contactIndex = legacyOrientationText.indexOf('Contact ');
    if (contactIndex > 0) {
      derivedCtaText = `${legacyOrientationText.slice(0, contactIndex).trim()}\n${legacyOrientationText
        .slice(contactIndex)
        .trim()}`;
    } else {
      const lines = legacyOrientationText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
      derivedCtaText = lines.join('\n');
    }
  }

  return {
    title: raw.title?.trim() ?? '',
    subtitle: raw.subtitle?.trim() ?? '',
    subtitleEmphasis: raw.subtitleEmphasis?.trim() ?? '',
    leftBoxTitle: raw.leftBoxTitle?.trim() || raw.dropInTitle?.trim() || '',
    leftBoxSubtitle: raw.leftBoxSubtitle?.trim() || raw.dropInSubtitle?.trim() || '',
    leftBoxPlans:
      (raw.leftBoxPlans ?? []).length > 0
        ? (raw.leftBoxPlans ?? []).map((item) => ({
            label: item.label?.trim() ?? '',
            value: item.value?.trim() ?? '',
          }))
        : (raw.dropInPlans ?? []).length > 0
        ? (raw.dropInPlans ?? []).map((item) => ({
            label: item.label?.trim() ?? '',
            value: item.value?.trim() ?? '',
          }))
        : [
            {label: 'Single', value: raw.dropInSingleValue?.trim() ?? ''},
            {label: 'Pack of 10', value: raw.dropInPack10Value?.trim() ?? ''},
          ],
    rightBoxTitle: raw.rightBoxTitle?.trim() || raw.monthlyTitle?.trim() || '',
    rightBoxSubtitle: raw.rightBoxSubtitle?.trim() || raw.monthlySubtitle?.trim() || '',
    rightBoxPlans:
      (raw.rightBoxPlans ?? []).length > 0
        ? (raw.rightBoxPlans ?? []).map((item) => ({
            label: item.label?.trim() ?? '',
            value: item.value?.trim() ?? '',
          }))
        : (raw.monthlyPlans ?? []).map((item) => ({
            label: item.label?.trim() ?? '',
            value: item.value?.trim() ?? '',
          })),
    callToActionText: derivedCtaText,
    callToActionEmail: raw.callToActionEmail?.trim() || raw.orientationEmail?.trim() || '',
    signupLabel: raw.signupLabel?.trim() ?? '',
    signupUrl: normalizeExternalUrl(raw.signupUrl?.trim() ?? ''),
    signupButtonColor: resolveSanityHexColor(raw.signupButtonColor),
    signupButtonTextColor: resolveSanityHexColor(raw.signupButtonTextColor, '#FFFFFF'),
  };
}
