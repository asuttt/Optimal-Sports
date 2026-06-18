import { useCallback, useEffect, useMemo, useState } from 'react';
import { getStorageItem, setStorageItem } from '@/lib/storage';
import { DEFAULT_MEDIA_TRANSFORM, MediaTransform, MediaTransformMap, normalizeMediaTransform } from '@/lib/mediaTransforms';
import { getPublicMediaBaselineTransforms } from '@/data/publicMediaTransforms';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function normalizeTransformMap(value: unknown): MediaTransformMap {
  if (!isRecord(value)) return {};

  const entries = Object.entries(value).map(([id, raw]) => [
    id,
    normalizeMediaTransform(isRecord(raw) ? (raw as Partial<MediaTransform>) : null),
  ]);

  return Object.fromEntries(entries);
}

interface UseMediaTransformsOptions {
  useLocalOverrides?: boolean;
}

export function useMediaTransforms(scopeKey: string, options: UseMediaTransformsOptions = {}) {
  const { useLocalOverrides = true } = options;
  const storageKey = useMemo(() => `gym_site_template_media_transforms_${scopeKey}`, [scopeKey]);
  const baselineTransforms = useMemo(
    () => normalizeTransformMap(getPublicMediaBaselineTransforms(scopeKey)),
    [scopeKey]
  );

  const [overrides, setOverrides] = useState<MediaTransformMap>(() => {
    if (typeof window === 'undefined' || !useLocalOverrides) return {};
    return normalizeTransformMap(getStorageItem<unknown>(storageKey));
  });

  useEffect(() => {
    if (!useLocalOverrides) return;
    setStorageItem(storageKey, overrides);
  }, [overrides, storageKey, useLocalOverrides]);

  useEffect(() => {
    if (!import.meta.env.DEV || typeof window === 'undefined' || !useLocalOverrides) return;

    type DebugWindow = Window & {
      __GYM_SITE_TEMPLATE_MEDIA_TRANSFORMS__?: Record<string, MediaTransformMap>;
      __GYM_SITE_TEMPLATE_EXPORT_MEDIA_TRANSFORMS__?: () => string;
    };

    const debugWindow = window as DebugWindow;
    if (!debugWindow.__GYM_SITE_TEMPLATE_MEDIA_TRANSFORMS__) {
      debugWindow.__GYM_SITE_TEMPLATE_MEDIA_TRANSFORMS__ = {};
    }

    debugWindow.__GYM_SITE_TEMPLATE_MEDIA_TRANSFORMS__[scopeKey] = {
      ...baselineTransforms,
      ...overrides,
    };

    debugWindow.__GYM_SITE_TEMPLATE_EXPORT_MEDIA_TRANSFORMS__ = () =>
      JSON.stringify(debugWindow.__GYM_SITE_TEMPLATE_MEDIA_TRANSFORMS__, null, 2);
  }, [baselineTransforms, overrides, scopeKey, useLocalOverrides]);

  const transforms = useMemo(
    () => (useLocalOverrides ? { ...baselineTransforms, ...overrides } : baselineTransforms),
    [baselineTransforms, overrides, useLocalOverrides]
  );

  const getTransform = useCallback(
    (id: string): MediaTransform => transforms[id] ?? DEFAULT_MEDIA_TRANSFORM,
    [transforms]
  );
  const hasTransform = useCallback((id: string) => id in transforms, [transforms]);

  const setTransform = useCallback((id: string, next: MediaTransform | ((current: MediaTransform) => MediaTransform)) => {
    if (!useLocalOverrides) return;
    setOverrides((prev) => {
      const current = prev[id] ?? baselineTransforms[id] ?? DEFAULT_MEDIA_TRANSFORM;
      const resolved = typeof next === 'function' ? next(current) : next;
      return { ...prev, [id]: normalizeMediaTransform(resolved) };
    });
  }, [baselineTransforms, useLocalOverrides]);

  const resetTransform = useCallback((id: string) => {
    if (!useLocalOverrides) return;
    setOverrides((prev) => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, [useLocalOverrides]);

  const resetAllTransforms = useCallback(() => {
    if (!useLocalOverrides) return;
    setOverrides({});
  }, [useLocalOverrides]);

  return {
    transforms,
    hasTransform,
    getTransform,
    setTransform,
    resetTransform,
    resetAllTransforms,
  };
}
