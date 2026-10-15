/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}

/** Application version, used to discard caches persisted by previous versions */
declare const __APP_VERSION__: string
