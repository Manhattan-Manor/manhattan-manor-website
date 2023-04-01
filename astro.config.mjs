import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import react from "@astrojs/react";

import criticalCss from "astro-critical-css";

// https://astro.build/config
export default defineConfig({
  integrations: [astroI18next(), react(), criticalCss()],
  vite: {
    ssr: {
      noExternal: ["@splidejs/react-splide"],
    }
  }
});