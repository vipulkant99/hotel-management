import { createClient } from "@supabase/supabase-js";

export const VITE_SUPABASE_URL = "https://yvitgsdiyavzerluvmov.supabase.co";
const VITE_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2aXRnc2RpeWF2emVybHV2bW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2ODc5MjEsImV4cCI6MjA2ODI2MzkyMX0.bBF8xC-_s_AHkhcgVoTadB3WznpMR2PZmktjbentohI";

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

export default supabase;
