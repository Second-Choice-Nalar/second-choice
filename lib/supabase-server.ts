import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// Ambil URL dan SERVICE KEY dari environment variables
const supabaseUrl = process.env.SUPABASE_URL as string;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// Pastikan variabel ada
if (!supabaseUrl || !serviceKey) {
  throw new Error("Missing Supabase URL or Service Role Key");
}

// Buat klien yang menggunakan SERVICE KEY
// Klien ini akan MELEWATI (BYPASS) semua RLS
export const supabaseService = createClient(supabaseUrl, serviceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
