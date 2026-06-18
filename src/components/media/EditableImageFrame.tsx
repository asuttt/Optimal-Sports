import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEventHandler,
  type SyntheticEvent,
} from 'react';
import {
  ControlsPlacement,
  ControlsSide,
  DEFAULT_MEDIA_TRANSFORM,
  MEDIA_MAX_ZOOM,
  MediaTransform,
} from '@/lib/mediaTransforms';
import { cn } from '@/lib/utils';

interface EditableImageFrameProps {
  src: string;
  alt: string;
  loading?: 'eager' | 'lazy';
  className?: string;
  imageClassName?: string;
  style?: CSSProperties;
  objectPosition?: string;
  editObjectFit?: 'contain' | 'cover';
  controlsPlacement?: ControlsPlacement;
  controlsSide?: ControlsSide;
  isEditing: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onDeselect?: () => void;
  transform: MediaTransform;
  onTransformChange: (next: MediaTransform | ((current: MediaTransform) => MediaTransform)) => void;
  onReset?: () => void;
}

const EPSILON = 0.001;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parsePositionToken(token: string | undefined, axis: 'x' | 'y') {
  if (!token) return 0.5;

  const normalized = token.toLowerCase().trim();
  if (normalized === 'center') return 0.5;
  if (axis === 'x') {
    if (normalized === 'left') return 0;
    if (normalized === 'right') return 1;
  } else {
    if (normalized === 'top') return 0;
    if (normalized === 'bottom') return 1;
  }
  if (normalized.endsWith('%')) {
    const parsed = Number.parseFloat(normalized.slice(0, -1));
    if (Number.isFinite(parsed)) {
      return clamp(parsed / 100, 0, 1);
    }
  }

  return 0.5;
}

function parseObjectPosition(value: string) {
  const tokens = value.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return { x: 0.5, y: 0.5 };
  if (tokens.length === 1) {
    const token = tokens[0].toLowerCase();
    if (token === 'top' || token === 'bottom') {
      return { x: 0.5, y: parsePositionToken(token, 'y') };
    }
    return { x: parsePositionToken(token, 'x'), y: 0.5 };
  }

  return {
    x: parsePositionToken(tokens[0], 'x'),
    y: parsePositionToken(tokens[1], 'y'),
  };
}

export default function EditableImageFrame({
  src,
  alt,
  loading = 'lazy',
  className,
  imageClassName,
  style,
  objectPosition = 'center center',
  editObjectFit = 'cover',
  controlsPlacement = 'inside',
  controlsSide = 'auto',
  isEditing,
  isSelected = false,
  onSelect,
  onDeselect,
  transform,
  onTransformChange,
  onReset,
}: EditableImageFrameProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [computedControlsSide, setComputedControlsSide] = useState<'left' | 'right'>('right');
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dragStartRef = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number } | null>(null);
  const frameStyle: CSSProperties = {
    ...(style ?? {}),
    touchAction: isEditing ? 'none' : style?.touchAction,
  };

  const resolvedObjectPosition = isEditing && editObjectFit === 'contain' ? 'center center' : objectPosition;
  const positionAnchor = useMemo(() => parseObjectPosition(resolvedObjectPosition), [resolvedObjectPosition]);

  useEffect(() => {
    const frameElement = frameRef.current;
    if (!frameElement || typeof ResizeObserver === 'undefined') return;

    const updateFrameSize = () => {
      const rect = frameElement.getBoundingClientRect();
      setFrameSize({
        width: rect.width,
        height: rect.height,
      });
    };

    updateFrameSize();

    const resizeObserver = new ResizeObserver(updateFrameSize);
    resizeObserver.observe(frameElement);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    setNaturalSize({ width: 0, height: 0 });
  }, [src]);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement || !imageElement.complete) return;
    if (imageElement.naturalWidth <= 0 || imageElement.naturalHeight <= 0) return;

    setNaturalSize({
      width: imageElement.naturalWidth,
      height: imageElement.naturalHeight,
    });
  }, [src]);

  const imageGeometry = useMemo(() => {
    if (frameSize.width <= 0 || frameSize.height <= 0) return null;
    if (naturalSize.width <= 0 || naturalSize.height <= 0) return null;

    const containScale = Math.min(frameSize.width / naturalSize.width, frameSize.height / naturalSize.height);
    const coverScale = Math.max(frameSize.width / naturalSize.width, frameSize.height / naturalSize.height);

    return {
      containScale,
      coverScale,
      frameWidth: frameSize.width,
      frameHeight: frameSize.height,
      naturalWidth: naturalSize.width,
      naturalHeight: naturalSize.height,
    };
  }, [frameSize.height, frameSize.width, naturalSize.height, naturalSize.width]);

  const minZoom = useMemo(() => {
    if (!imageGeometry) return 1;
    if (editObjectFit === 'contain') return 1;
    return imageGeometry.coverScale / imageGeometry.containScale;
  }, [editObjectFit, imageGeometry]);
  const maxZoom = useMemo(() => Math.max(minZoom, MEDIA_MAX_ZOOM), [minZoom]);

  const clampTransform = useCallback(
    (next: MediaTransform): MediaTransform => {
      const clampedScale = clamp(next.scale, minZoom, maxZoom);

      if (!imageGeometry) {
        return {
          ...next,
          scale: clampedScale,
        };
      }

      const renderedScale = imageGeometry.containScale * clampedScale;
      const renderedWidth = imageGeometry.naturalWidth * renderedScale;
      const renderedHeight = imageGeometry.naturalHeight * renderedScale;
      const overflowX = Math.max(0, renderedWidth - imageGeometry.frameWidth);
      const overflowY = Math.max(0, renderedHeight - imageGeometry.frameHeight);
      const baseOffsetX = (0.5 - positionAnchor.x) * overflowX;
      const baseOffsetY = (0.5 - positionAnchor.y) * overflowY;
      const minX = -overflowX / 2 - baseOffsetX;
      const maxX = overflowX / 2 - baseOffsetX;
      const minY = -overflowY / 2 - baseOffsetY;
      const maxY = overflowY / 2 - baseOffsetY;

      return {
        ...next,
        scale: clampedScale,
        x: clamp(next.x, minX, maxX),
        y: clamp(next.y, minY, maxY),
      };
    },
    [imageGeometry, maxZoom, minZoom, positionAnchor.x, positionAnchor.y]
  );

  const resolvedTransform = useMemo(() => clampTransform(transform), [clampTransform, transform]);

  useEffect(() => {
    if (
      Math.abs(resolvedTransform.x - transform.x) <= EPSILON &&
      Math.abs(resolvedTransform.y - transform.y) <= EPSILON &&
      Math.abs(resolvedTransform.scale - transform.scale) <= EPSILON
    ) {
      return;
    }

    onTransformChange((current) => clampTransform(current));
  }, [clampTransform, onTransformChange, resolvedTransform.scale, resolvedTransform.x, resolvedTransform.y, transform.scale, transform.x, transform.y]);

  const renderedImageMetrics = useMemo(() => {
    if (!imageGeometry) return null;

    const renderedScale = imageGeometry.containScale * resolvedTransform.scale;
    const renderedWidth = imageGeometry.naturalWidth * renderedScale;
    const renderedHeight = imageGeometry.naturalHeight * renderedScale;
    const overflowX = Math.max(0, renderedWidth - imageGeometry.frameWidth);
    const overflowY = Math.max(0, renderedHeight - imageGeometry.frameHeight);
    const baseOffsetX = (0.5 - positionAnchor.x) * overflowX;
    const baseOffsetY = (0.5 - positionAnchor.y) * overflowY;

    return {
      renderedWidth,
      renderedHeight,
      centerX: imageGeometry.frameWidth / 2 + baseOffsetX + resolvedTransform.x,
      centerY: imageGeometry.frameHeight / 2 + baseOffsetY + resolvedTransform.y,
    };
  }, [imageGeometry, positionAnchor.x, positionAnchor.y, resolvedTransform.scale, resolvedTransform.x, resolvedTransform.y]);

  const isExpandedEditor = isEditing && isSelected;

  useEffect(() => {
    if (!isEditing || !isSelected || controlsPlacement !== 'outside' || controlsSide !== 'auto') return;
    if (typeof window === 'undefined') return;

    const updateSide = () => {
      const rect = frameRef.current?.getBoundingClientRect();
      if (!rect) return;

      const panelWidth = 220;
      const panelGap = 12;
      const rightRoom = window.innerWidth - rect.right;
      setComputedControlsSide(rightRoom >= panelWidth + panelGap ? 'right' : 'left');
    };

    updateSide();
    window.addEventListener('resize', updateSide);
    return () => window.removeEventListener('resize', updateSide);
  }, [controlsPlacement, controlsSide, isEditing, isSelected]);

  useEffect(() => {
    if (!isEditing || !isSelected || !onDeselect) return;
    if (typeof document === 'undefined') return;

    const handleOutsidePointerDown = (event: PointerEvent) => {
      const frameElement = frameRef.current;
      const targetNode = event.target instanceof Node ? event.target : null;
      if (!frameElement || !targetNode) return;
      if (frameElement.contains(targetNode)) return;
      onDeselect();
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown, true);
    return () => document.removeEventListener('pointerdown', handleOutsidePointerDown, true);
  }, [isEditing, isSelected, onDeselect]);

  const activeControlsSide = controlsSide === 'auto' ? computedControlsSide : controlsSide;
  const controlsClassName = useMemo(() => {
    if (controlsPlacement === 'inside') {
      return 'absolute inset-x-2 bottom-2 z-40';
    }

    const sideClass = activeControlsSide === 'left' ? 'lg:right-[calc(100%+0.75rem)]' : 'lg:left-[calc(100%+0.75rem)]';
    return cn('absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 lg:left-auto lg:right-auto lg:inset-x-auto lg:bottom-auto lg:top-2 lg:w-56', sideClass);
  }, [activeControlsSide, controlsPlacement]);

  const stopControlPointerEvent: PointerEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
  };

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!isEditing) return;

    onSelect?.();
    dragStartRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: resolvedTransform.x,
      originY: resolvedTransform.y,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!isEditing || !dragStartRef.current) return;
    if (dragStartRef.current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragStartRef.current.startX;
    const deltaY = event.clientY - dragStartRef.current.startY;

    onTransformChange((current) =>
      clampTransform({
        ...current,
        x: dragStartRef.current ? dragStartRef.current.originX + deltaX : current.x,
        y: dragStartRef.current ? dragStartRef.current.originY + deltaY : current.y,
      })
    );
  };

  const finishDrag = (pointerId: number) => {
    if (!dragStartRef.current || dragStartRef.current.pointerId !== pointerId) return;
    dragStartRef.current = null;
    setIsDragging(false);
  };

  const handlePointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    finishDrag(event.pointerId);
  };

  const handlePointerCancel: PointerEventHandler<HTMLDivElement> = (event) => {
    finishDrag(event.pointerId);
  };

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setNaturalSize({
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    });
  };

  return (
    <div
      ref={frameRef}
      className={cn(
        'relative',
        isExpandedEditor ? 'z-30' : '',
        isEditing ? 'cursor-grab active:cursor-grabbing' : '',
        isSelected && isEditing ? 'ring-2 ring-primary/50 ring-offset-2 ring-offset-transparent' : '',
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={frameStyle}
      role={isEditing ? 'button' : undefined}
      tabIndex={isEditing ? 0 : -1}
      aria-label={isEditing ? `Edit image ${alt}` : undefined}
    >
      <div className={cn('relative h-full w-full rounded-[inherit]', isExpandedEditor ? 'overflow-visible' : 'overflow-hidden', isEditing ? 'bg-black/5' : '')}>
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          loading={loading}
          draggable={false}
          className={cn('absolute select-none', imageClassName)}
          style={
            renderedImageMetrics
              ? {
                  width: renderedImageMetrics.renderedWidth,
                  height: renderedImageMetrics.renderedHeight,
                  left: renderedImageMetrics.centerX,
                  top: renderedImageMetrics.centerY,
                  maxWidth: 'none',
                  imageRendering: 'auto',
                  transform: `translate(-50%, -50%) rotate(${resolvedTransform.rotate}deg)`,
                  transformOrigin: 'center center',
                }
              : {
                  height: '100%',
                  width: '100%',
                  imageRendering: 'auto',
                  objectFit: editObjectFit,
                  objectPosition: resolvedObjectPosition,
                  transform: `translate3d(${resolvedTransform.x}px, ${resolvedTransform.y}px, 0) rotate(${resolvedTransform.rotate}deg)`,
                  transformOrigin: 'center center',
                }
          }
        />
        {isEditing ? (
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 z-20 rounded-[inherit]',
              isSelected ? 'opacity-100' : 'opacity-85'
            )}
          >
            <span className="absolute inset-y-0 left-1/3 w-px bg-white/60" />
            <span className="absolute inset-y-0 left-2/3 w-px bg-white/60" />
            <span className="absolute inset-x-0 top-1/3 h-px bg-white/60" />
            <span className="absolute inset-x-0 top-2/3 h-px bg-white/60" />
          </div>
        ) : null}
      </div>

      {isExpandedEditor ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] border-2 border-primary/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]"
        />
      ) : null}

      {isEditing && isSelected ? (
        <div
          className={cn(controlsClassName, 'rounded-md bg-black/70 p-2 text-white shadow-sm backdrop-blur-sm')}
          onPointerDown={stopControlPointerEvent}
          onPointerMove={stopControlPointerEvent}
          onPointerUp={stopControlPointerEvent}
          onPointerCancel={stopControlPointerEvent}
        >
          <div className="mb-1 flex items-center justify-between text-[11px] font-medium">
            <span>{isDragging ? 'Dragging...' : 'Drag / Zoom / Rotate'}</span>
            <button
              type="button"
              className="rounded border border-white/50 px-2 py-0.5 text-[10px] hover:bg-white/20"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                dragStartRef.current = null;
                setIsDragging(false);
                if (onReset) {
                  onReset();
                  return;
                }
                onTransformChange(DEFAULT_MEDIA_TRANSFORM);
              }}
            >
              Reset
            </button>
          </div>
          <label className="mb-1 block text-[10px]">
            Zoom {resolvedTransform.scale.toFixed(2)}x
            <input
              type="range"
              min={minZoom}
              max={maxZoom}
              step={0.01}
              value={resolvedTransform.scale}
              className="mt-1 w-full"
              onChange={(event) => {
                const value = Number(event.target.value);
                onTransformChange((current) => clampTransform({ ...current, scale: value }));
              }}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => event.stopPropagation()}
            />
          </label>
          <label className="block text-[10px]">
            Rotate {resolvedTransform.rotate.toFixed(0)}°
            <input
              type="range"
              min={-25}
              max={25}
              step={1}
              value={resolvedTransform.rotate}
              className="mt-1 w-full"
              onChange={(event) => {
                const value = Number(event.target.value);
                onTransformChange((current) => ({ ...current, rotate: value }));
              }}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => event.stopPropagation()}
            />
          </label>
        </div>
      ) : null}
    </div>
  );
}
