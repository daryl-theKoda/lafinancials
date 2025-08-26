import { createBrowserClient } from '@supabase/ssr';

// Debug logs (visible in browser console)
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);

// Create a singleton client instance
let _client: ReturnType<typeof createBrowserClient> | null = null;

export const supabase = (() => {
  if (_client) return _client;
  _client = createBrowserClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  return _client;
})();

// Optional getter if needed elsewhere
export function getSupabaseClient() {
  return supabase;
}
