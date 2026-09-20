/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_APP_ENV?: string;
  readonly VITE_AI_SERVICE_URL?: string;
  readonly VITE_ENABLE_MOCK_DATA?: string;
  readonly VITE_ENABLE_ROLE_SWITCHER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
