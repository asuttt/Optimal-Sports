import {fetchClassesPageContent, type ClassesPageContent} from '@/lib/sanity/classesPage';
import {fetchClubHausPageContent, type ClubHausPageContent} from '@/lib/sanity/clubHausPage';
import {fetchFacilityPageContent, type FacilityPageContent} from '@/lib/sanity/facilityPage';
import {fetchHomePageContent, type HomePageContent} from '@/lib/sanity/homePage';
import {fetchMembershipsPageContent, type MembershipsPageContent} from '@/lib/sanity/membershipsPage';
import {fetchOurStoryPageContent, type OurStoryPageContent} from '@/lib/sanity/ourStoryPage';
import {fetchPrivacyTermsPageContent, type PrivacyTermsPageContent} from '@/lib/sanity/privacyTermsPage';
import {fetchSchedulePageContent, type SchedulePageContent} from '@/lib/sanity/schedulePage';
import {fetchTrainingPageContent, type TrainingPageContent} from '@/lib/sanity/trainingPage';

type CmsFetcher<T> = () => Promise<T | null>;

const pendingByKey = new Map<string, Promise<unknown | null>>();
const resolvedByKey = new Map<string, unknown | null>();

function normalizePath(pathname: string) {
  const trimmed = pathname.trim();
  if (!trimmed || trimmed === '/') return '/';
  return trimmed.replace(/\/+$/, '');
}

async function loadCachedContent<T>(key: string, fetcher: CmsFetcher<T>): Promise<T | null> {
  if (resolvedByKey.has(key)) {
    return (resolvedByKey.get(key) as T | null) ?? null;
  }

  const existingPromise = pendingByKey.get(key) as Promise<T | null> | undefined;
  if (existingPromise) return existingPromise;

  const requestPromise = fetcher()
    .then((content) => {
      const safeContent = content ?? null;
      resolvedByKey.set(key, safeContent);
      pendingByKey.delete(key);
      return safeContent;
    })
    .catch((error) => {
      pendingByKey.delete(key);
      throw error;
    });

  pendingByKey.set(key, requestPromise as Promise<unknown | null>);
  return requestPromise;
}

export function loadHomePageContentCached(): Promise<HomePageContent | null> {
  return loadCachedContent('home', fetchHomePageContent);
}

export function loadOurStoryPageContentCached(): Promise<OurStoryPageContent | null> {
  return loadCachedContent('ourStory', fetchOurStoryPageContent);
}

export function loadPrivacyTermsPageContentCached(): Promise<PrivacyTermsPageContent | null> {
  return loadCachedContent('privacyTerms', fetchPrivacyTermsPageContent);
}

export function loadFacilityPageContentCached(): Promise<FacilityPageContent | null> {
  return loadCachedContent('facility', fetchFacilityPageContent);
}

export function loadClassesPageContentCached(): Promise<ClassesPageContent | null> {
  return loadCachedContent('classes', fetchClassesPageContent);
}

export function loadTrainingPageContentCached(): Promise<TrainingPageContent | null> {
  return loadCachedContent('training', fetchTrainingPageContent);
}

export function loadClubHausPageContentCached(): Promise<ClubHausPageContent | null> {
  return loadCachedContent('clubHaus', fetchClubHausPageContent);
}

export function loadMembershipsPageContentCached(): Promise<MembershipsPageContent | null> {
  return loadCachedContent('memberships', fetchMembershipsPageContent);
}

export function loadSchedulePageContentCached(): Promise<SchedulePageContent | null> {
  return loadCachedContent('schedule', fetchSchedulePageContent);
}

const ROUTE_LOADERS: Record<string, () => Promise<unknown | null>> = {
  '/': loadHomePageContentCached,
  '/our-story': loadOurStoryPageContentCached,
  '/privacy-terms': loadPrivacyTermsPageContentCached,
  '/facility': loadFacilityPageContentCached,
  '/classes': loadClassesPageContentCached,
  '/training': loadTrainingPageContentCached,
  '/club-haus': loadClubHausPageContentCached,
  '/memberships': loadMembershipsPageContentCached,
  '/schedule': loadSchedulePageContentCached,
};

export function prefetchPublicRouteContent(pathname: string) {
  const loader = ROUTE_LOADERS[normalizePath(pathname)];
  if (!loader) return;

  void loader().catch(() => {});
}

export function prefetchNextPublicRouteContent(currentPathname: string, orderedPaths: string[]) {
  if (orderedPaths.length < 2) return;

  const normalizedPaths = orderedPaths.map(normalizePath);
  const normalizedCurrentPath = normalizePath(currentPathname);
  const currentIndex = normalizedPaths.indexOf(normalizedCurrentPath);
  if (currentIndex < 0 || currentIndex >= normalizedPaths.length - 1) return;

  const nextPath = normalizedPaths[currentIndex + 1];
  prefetchPublicRouteContent(nextPath);
}
