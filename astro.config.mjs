import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import react from "@astrojs/react";
import image from "@astrojs/image";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    astroI18next(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  vite: {
    ssr: {
      noExternal: ["@splidejs/react-splide"],
    },
  },
  site: "https://manhattanmanor.com/",
});
