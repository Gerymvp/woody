// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? 'Configurada' : 'NO CONFIGURADA');
console.log('Supabase Key:', supabaseAnonKey ? 'Configurada' : 'NO CONFIGURADA');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('ERROR: Variables de Supabase no configuradas');
}

export const supabase = (() => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('No se puede crear cliente de Supabase');
    return null;
  }
  
  try {
    const client = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Cliente de Supabase creado exitosamente');
    return client;
  } catch (error) {
    console.error('Error al crear cliente de Supabase:', error);
    return null;
  }
})();