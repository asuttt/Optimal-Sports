import { createContext, type Dispatch, type SetStateAction } from 'react';

export interface PublicMediaEditContextValue {
  canEditMedia: boolean;
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  toggleEditMode: () => void;
}

export const PublicMediaEditContext = createContext<PublicMediaEditContextValue | null>(null);
