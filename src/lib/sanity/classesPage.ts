import {sanityClient} from '@/lib/sanity/client';

export interface ClassesPageSubsection {
  label: string;
  value: string;
}

export interface ClassesPageCard {
  label: string;
  value: string;
  hasMultipleSubsections: boolean;
  subsections: ClassesPageSubsection[];
}

export interface ClassesPageContent {
  title: string;
  subtitle: string;
  subtitleEmphasis: string;
  classCards: ClassesPageCard[];
}

interface ClassesPageRawCard {
  label?: string;
  value?: string;
  hasMultipleSubsections?: boolean;
  subsections?: Array<{
    label?: string;
    value?: string;
  }>;

  // Legacy keys to keep existing content visible during migration.
  title?: string;
  description?: unknown;
}

interface ClassesPageSanityRaw {
  title?: string;
  subtitle?: unknown;
  subtitleEmphasis?: string;
  classCards?: ClassesPageRawCard[];
}

const CLASSES_PAGE_QUERY = `
  *[_type == "classesPage" && _id == "classesPage"][0]{
    title,
    subtitle,
    subtitleEmphasis,
    classCards[]{
      label,
      value,
      hasMultipleSubsections,
      subsections[]{
        label,
        value
      },
      title,
      description
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

function normalizeCard(card: ClassesPageRawCard): ClassesPageCard {
  const label = card.label?.trim() || card.title?.trim() || '';
  const value = card.value?.trim() || toPlainText(card.description) || '';
  const subsections = (card.subsections ?? [])
    .map((subsection) => ({
      label: subsection.label?.trim() || '',
      value: subsection.value?.trim() || '',
    }))
    .filter((subsection) => subsection.label && subsection.value);

  const hasMultipleSubsections = Boolean(card.hasMultipleSubsections && subsections.length > 0);

  return {
    label,
    value,
    hasMultipleSubsections,
    subsections,
  };
}

export async function fetchClassesPageContent(): Promise<ClassesPageContent | null> {
  if (!sanityClient) return null;

  const raw = await sanityClient.fetch<ClassesPageSanityRaw | null>(CLASSES_PAGE_QUERY);
  if (!raw) return null;

  const normalizedCards = (raw.classCards ?? []).map(normalizeCard).filter((card) => card.label);

  return {
    title: raw.title?.trim() || '',
    subtitle: toPlainText(raw.subtitle) || '',
    subtitleEmphasis: raw.subtitleEmphasis?.trim() || '',
    classCards: normalizedCards,
  };
}
