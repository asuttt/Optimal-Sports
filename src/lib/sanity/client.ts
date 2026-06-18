import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2026-02-23';

export const isSanityConfigured = Boolean(projectId && dataset);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null;

const imageBuilder = isSanityConfigured && sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForSanityImage(source: unknown) {
  if (!imageBuilder) return null;
  return imageBuilder.image(source);
}
