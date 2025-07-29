/// <reference types="vite/client" />
declare module 'vue-horizontal'

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
  VITE_MAGIC_WORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
