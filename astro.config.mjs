import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    astroI18next(),
    sitemap(),
  ],
  vite: {
    ssr: {
      noExternal: ["@splidejs/react-splide", "animate.css"],
    },
  },
  site: "https://manhattanmanor.com/",
});
