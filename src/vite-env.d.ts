/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN: string
  readonly VITE_AUTH0_CLIENT_ID: string
  readonly VITE_APP_REFRESH_RATE: string
  readonly VITE_APP_AUCTIONS_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}