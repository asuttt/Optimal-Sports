import { cn } from '@/lib/utils';
import { usePublicMediaEdit } from '@/contexts/usePublicMediaEdit';

interface MediaEditToggleButtonProps {
  className?: string;
}

export default function MediaEditToggleButton({ className }: MediaEditToggleButtonProps) {
  const { canEditMedia, isEditMode, toggleEditMode } = usePublicMediaEdit();

  if (!canEditMedia) return null;

  return (
    <button
      type="button"
      onClick={toggleEditMode}
      className={cn(
        'relative z-[70] rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        isEditMode
          ? 'border border-red-500/70 text-red-600 hover:bg-red-50'
          : 'border border-primary/50 text-primary hover:bg-primary/10',
        className
      )}
    >
      {isEditMode ? 'Done Editing' : 'Edit Photos'}
    </button>
  );
}
