/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_YANDEX_OAUTH_TOKEN: string;
  readonly VITE_YANDEX_FOLDER_ID: string;
  readonly VITE_API_URL: string;
  readonly VITE_DEBUG: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
