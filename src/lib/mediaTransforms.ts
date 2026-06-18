export interface MediaTransform {
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

export type MediaTransformMap = Record<string, MediaTransform>;

export const MEDIA_MIN_ZOOM = 1;
export const MEDIA_MAX_ZOOM = 4;

export const DEFAULT_MEDIA_TRANSFORM: MediaTransform = {
  x: 0,
  y: 0,
  scale: MEDIA_MIN_ZOOM,
  rotate: 0,
};

export type ControlsPlacement = 'inside' | 'outside';
export type ControlsSide = 'auto' | 'left' | 'right';

export function normalizeMediaTransform(value?: Partial<MediaTransform> | null): MediaTransform {
  if (!value) return DEFAULT_MEDIA_TRANSFORM;

  const safeScale = Number.isFinite(value.scale) ? Number(value.scale) : DEFAULT_MEDIA_TRANSFORM.scale;
  const safeRotate = Number.isFinite(value.rotate) ? Number(value.rotate) : DEFAULT_MEDIA_TRANSFORM.rotate;
  const safeX = Number.isFinite(value.x) ? Number(value.x) : DEFAULT_MEDIA_TRANSFORM.x;
  const safeY = Number.isFinite(value.y) ? Number(value.y) : DEFAULT_MEDIA_TRANSFORM.y;

  return {
    x: safeX,
    y: safeY,
    scale: Math.max(MEDIA_MIN_ZOOM, Math.min(MEDIA_MAX_ZOOM, safeScale)),
    rotate: Math.max(-90, Math.min(90, safeRotate)),
  };
}
