import { useContext } from 'react';
import { PublicMediaEditContext } from '@/contexts/publicMediaEdit.shared';

export function usePublicMediaEdit() {
  const context = useContext(PublicMediaEditContext);
  if (!context) {
    throw new Error('usePublicMediaEdit must be used within PublicMediaEditProvider');
  }

  return context;
}
