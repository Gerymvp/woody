import { supabase } from './supabase';

export type EventoTipo = 
  | 'visita_pagina' 
  | 'click_carrito' 
  | 'click_login' 
  | 'click_catalogo';

export async function trackEvent(evento_tipo: EventoTipo, detalles?: string) {
  // Si es una visita de página, evitemos duplicados en la misma sesión de pestaña
  if (evento_tipo === 'visita_pagina' && detalles) {
    const sessionKey = `tracked_visit_${detalles}`;
    if (sessionStorage.getItem(sessionKey)) {
      // Ya se registró esta visita en esta sesión, ignoramos para no inflar la métrica
      return;
    }
    // Marcamos como registrada en la sesión actual
    sessionStorage.setItem(sessionKey, 'true');
  }

  try {
    const { error } = await supabase
      .from('metricas_eventos')
      .insert([{ evento_tipo, detalles }]);
    
    if (error) console.error('Error al registrar métrica:', error.message);
  } catch (err) {
    console.error('Error de red al registrar métrica:', err);
  }
}