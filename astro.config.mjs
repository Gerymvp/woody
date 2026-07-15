import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      // Esta línea le indica a Tailwind que escanee todos los archivos .astro, .ts, etc.
      applyBaseStyles: false, 
      nesting: true
    })
  ]
});