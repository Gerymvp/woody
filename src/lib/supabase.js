<<<<<<< HEAD
<<<<<<< HEAD
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);
=======
=======
>>>>>>> 95d9f7d1aae0f6be883535e591ecb782c2e8cdcc
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
<<<<<<< HEAD
>>>>>>> 95d9f7d1aae0f6be883535e591ecb782c2e8cdcc
=======
>>>>>>> 95d9f7d1aae0f6be883535e591ecb782c2e8cdcc
