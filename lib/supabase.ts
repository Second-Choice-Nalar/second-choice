// lib/supabase.js
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
// Ganti dengan URL dan public API key dari dashboard Supabase
const supabase = createClient(
  process.env.SUPABASE_URL as string, // URL Supabase kamu
  process.env.PUBLIC_API_KEY as string // Public API key Supabase
);

export default supabase;
