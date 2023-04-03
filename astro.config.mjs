import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [astroI18next(), react()],
  vite: {
    ssr: {
      noExternal: ["@splidejs/react-splide"],
    },
  },
  site: "https://manhattanmanor.com/",
});
