import { useCallback, useEffect, useState } from 'react';
import { useMediaTransforms } from '@/hooks/useMediaTransforms';
import { usePublicMediaEdit } from '@/contexts/usePublicMediaEdit';

export function usePageMediaEditor(scopeKey: string) {
  const { canEditMedia, isEditMode } = usePublicMediaEdit();
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const { hasTransform, getTransform, setTransform, resetTransform, resetAllTransforms } = useMediaTransforms(scopeKey, {
    useLocalOverrides: canEditMedia,
  });

  useEffect(() => {
    if (!isEditMode) {
      setSelectedMediaId(null);
    }
  }, [isEditMode]);

  const clearSelectedMedia = useCallback(() => {
    setSelectedMediaId(null);
  }, []);

  return {
    canEditMedia,
    isEditMode,
    selectedMediaId,
    setSelectedMediaId,
    clearSelectedMedia,
    hasTransform,
    getTransform,
    setTransform,
    resetTransform,
    resetAllTransforms,
  };
}
