import {sanityClient} from '@/lib/sanity/client';
export interface TrainingPageCard {
  label: string;
  value: string;
}

export interface TrainingPageContent {
  title: string;
  subtitle: string;
  subtitleEmphasis: string;
  ptDetailCardTitle: string;
  trainingCards: TrainingPageCard[];
  callToActionText: string;
  callToActionEmail: string;
}

interface TrainingPageRawCard {
  label?: string;
  value?: string;

  // Legacy keys to keep existing content visible during migration.
  title?: string;
  description?: string;
}

interface TrainingPageSanityRaw {
  title?: string;
  subtitle?: unknown;
  subtitleEmphasis?: string;
  ptDetailCardTitle?: string;
  callToActionText?: string;
  callToActionLine1?: string;
  callToActionLine2?: string;
  trainingCards?: TrainingPageRawCard[];
  callToActionEmail?: string;

  // Legacy keys to keep existing content visible during migration.
  focusAreaCards?: TrainingPageRawCard[];
  contactEmail?: string;
}

const TRAINING_PAGE_QUERY = `
  *[_type == "trainingPage" && _id == "trainingPage"][0]{
    title,
    subtitle,
    subtitleEmphasis,
    ptDetailCardTitle,
    trainingCards[]{
      label,
      value,
      title,
      description
    },
    callToActionText,
    callToActionLine1,
    callToActionLine2,
    callToActionEmail,
    focusAreaCards[]{
      title,
      description
    },
    contactEmail
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

function normalizeCard(card: TrainingPageRawCard): TrainingPageCard {
  return {
    label: card.label?.trim() || card.title?.trim() || '',
    value: card.value?.trim() || card.description?.trim() || '',
  };
}

export async function fetchTrainingPageContent(): Promise<TrainingPageContent | null> {
  if (!sanityClient) return null;

  const raw = await sanityClient.fetch<TrainingPageSanityRaw | null>(TRAINING_PAGE_QUERY);
  if (!raw) return null;

  const rawCards = raw.trainingCards && raw.trainingCards.length > 0 ? raw.trainingCards : (raw.focusAreaCards ?? []);
  const normalizedCards = rawCards.map(normalizeCard).filter((card) => card.label);

  const line1 = raw.callToActionLine1?.trim() || '';
  const line2 = raw.callToActionLine2?.trim() || '';
  const legacyCtaText = raw.callToActionText?.trim() || '';
  let derivedText = '';

  if (legacyCtaText) {
    if (legacyCtaText.includes('\n')) {
      derivedText = legacyCtaText;
    } else {
      const contactIndex = legacyCtaText.indexOf('Contact ');
      derivedText =
        contactIndex > 0
          ? `${legacyCtaText.slice(0, contactIndex).trim()}\n${legacyCtaText.slice(contactIndex).trim()}`
          : legacyCtaText;
    }
  } else if (line1 && line2) {
    derivedText = `${line1}\n${line2}`;
  } else if (line1 || line2) {
    derivedText = line1 || line2;
  }

  return {
    title: raw.title?.trim() || '',
    subtitle: toPlainText(raw.subtitle) || '',
    subtitleEmphasis: raw.subtitleEmphasis?.trim() || '',
    ptDetailCardTitle: raw.ptDetailCardTitle?.trim() || '',
    trainingCards: normalizedCards,
    callToActionText: derivedText,
    callToActionEmail: raw.callToActionEmail?.trim() || raw.contactEmail?.trim() || '',
  };
}
