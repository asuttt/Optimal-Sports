/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SANITY_PROJECT_ID?: string;
  readonly VITE_SANITY_DATASET?: string;
  readonly VITE_SANITY_API_VERSION?: string;
  readonly VITE_SANITY_STUDIO_TITLE?: string;
  readonly VITE_MINDBODY_STUDIO_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
