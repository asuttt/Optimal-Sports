import EditableImageFrame from '@/components/media/EditableImageFrame';
import { MediaTransform } from '@/lib/mediaTransforms';
import { cn } from "@/lib/utils";

interface FacilityPhoto {
  id: string;
  src: string;
  alt: string;
}

interface FacilityPhotoGridProps {
  images: FacilityPhoto[];
  className?: string;
  isEditMode?: boolean;
  selectedImageId?: string | null;
  onSelectImage?: (id: string) => void;
  onDeselectImage?: () => void;
  getTransform?: (id: string) => MediaTransform;
  setTransform?: (id: string, next: MediaTransform | ((current: MediaTransform) => MediaTransform)) => void;
  resetTransform?: (id: string) => void;
}

export default function FacilityPhotoGrid({
  images,
  className,
  isEditMode = false,
  selectedImageId = null,
  onSelectImage,
  onDeselectImage,
  getTransform,
  setTransform,
  resetTransform,
}: FacilityPhotoGridProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        {images.map((image) => (
          <EditableImageFrame
            key={image.id}
            src={image.src}
            alt={image.alt}
            isEditing={isEditMode}
            isSelected={selectedImageId === image.id}
            onSelect={() => onSelectImage?.(image.id)}
            onDeselect={onDeselectImage}
            transform={getTransform ? getTransform(image.id) : { x: 0, y: 0, scale: 1, rotate: 0 }}
            onTransformChange={(next) => {
              if (!setTransform) return;
              setTransform(image.id, next);
            }}
            onReset={() => resetTransform?.(image.id)}
            className="rounded-2xl border border-black/5 shadow-sm aspect-[4/3]"
            imageClassName="h-full w-full object-cover"
            controlsPlacement="outside"
            controlsSide="auto"
          />
        ))}
      </div>
    </div>
  );
}
