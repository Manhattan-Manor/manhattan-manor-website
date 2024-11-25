import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import react from "@astrojs/react";
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    astroI18next(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
  vite: {
    ssr: {
      noExternal: ["@splidejs/react-splide"],
    },
  },
  site: "https://manhattanmanor.com/",
});
