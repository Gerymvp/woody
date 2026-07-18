import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel'; // Puedes cambiarlo por @astrojs/netlify si usas Netlify

// https://astro.build/config
export default defineConfig({
  output: 'server', // Habilita el renderizado en el servidor en tiempo real
  adapter: vercel(), // Indica el adaptador de la plataforma donde subes la web
  vite: {
    plugins: [tailwindcss()]
  }
});