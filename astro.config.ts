import MillionLint from "@million/lint";
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
const _plugins = [MillionLint.vite()];

// https://astro.build/config
export default defineConfig({
  site: "https://hayleylalchand.com",
  integrations: [tailwind()],
  outDir: "./docs",
});
