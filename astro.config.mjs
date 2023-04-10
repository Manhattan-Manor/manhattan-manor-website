import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import react from "@astrojs/react";
import image from "@astrojs/image";
import critters from "astro-critters";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), astroI18next(), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  }), critters(), compress()],
  vite: {
    ssr: {
      noExternal: ["@splidejs/react-splide"]
    }
  },
  site: "https://manhattanmanor.com/"
});