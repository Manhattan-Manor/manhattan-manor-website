import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), astroI18next()],
  vite: {
    ssr: {
      noExternal: ["@splidejs/react-splide"],
    },
  },
  site: "https://manhattan-manor.github.io",
  base: "/manhattan-manor-website",
});
