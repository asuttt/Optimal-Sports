import { useMemo, useState, type ReactNode } from 'react';
import { PublicMediaEditContext, type PublicMediaEditContextValue } from '@/contexts/publicMediaEdit.shared';

export function PublicMediaEditProvider({ children }: { children: ReactNode }) {
  const canEditMedia = import.meta.env.DEV;
  const [isEditMode, setIsEditMode] = useState(false);

  const value = useMemo<PublicMediaEditContextValue>(() => {
    return {
      canEditMedia,
      isEditMode: canEditMedia ? isEditMode : false,
      setIsEditMode,
      toggleEditMode: () => {
        if (!canEditMedia) return;
        setIsEditMode((current) => !current);
      },
    };
  }, [canEditMedia, isEditMode]);

  return (
    <PublicMediaEditContext.Provider value={value}>
      {children}
    </PublicMediaEditContext.Provider>
  );
}
