import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://zhxqrjtxcmubxquttbyx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoeHFyanR4Y211YnhxdXR0Ynl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NjU1MTEsImV4cCI6MjA5MzE0MTUxMX0.AfTnrBRYdbjT-TGdyoLYj6ZRlPkDS7uat69VmFQyHOs";




export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);