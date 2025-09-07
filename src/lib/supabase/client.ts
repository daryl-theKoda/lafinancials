import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL = "https://bhxqcailvqjegovwhcvc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoeHFjYWlsdnFqZWdvdndoY3ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwODA1MTMsImV4cCI6MjA2OTY1NjUxM30.9opCz-8bgC3na5lH2GnVa3m7wt7z7hNnwag9JjlZlT8";

// Create a singleton client instance
let _client: ReturnType<typeof createBrowserClient> | null = null;

export const supabase = (() => {
  if (_client) return _client;
  _client = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _client;
})();

// Optional getter if needed elsewhere
export function getSupabaseClient() {
  return supabase;
}
