import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  preprocess: autoPreprocess({
    defaults: {
      script: "typescript",
    },
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  }),
};
