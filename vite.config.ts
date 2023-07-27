import { defineConfig, type PluginOption } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [svelte(), visualizer() as PluginOption],
  build: {
    lib: {
      entry: "/src/index.ts",
      name: "BuyNowModal",
      fileName: (format) => `BuyNowModal.${format}.js`,
    },
    rollupOptions: {
      external: ["svelte"],
      output: {
        globals: {
          svelte: "svelte",
        },
      },
    },
  },
});
