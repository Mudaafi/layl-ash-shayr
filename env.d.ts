/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FN_EVENTBRITE_URL: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string
  // Add more environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
