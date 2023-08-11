import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
// import { visualizer } from "rollup-plugin-visualizer";
import typescript from "@rollup/plugin-typescript";
import libCss from 'vite-plugin-libcss';
import sveltePreprocess from 'svelte-preprocess';

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess({})
    }),
    typescript(),
    libCss(),
    /*,visualizer() as PluginOption*/
  ],
  build: {
    lib: {
      entry: "/src/index.ts",
      name: "BuyNowModal",
      fileName: (format) => `BuyNowModal.${format}.js`,
    },
    rollupOptions: {
      external: [
        "svelte",
        "svelte/internal",
        "ethers",
        "viem",
        "@wagmi/chains",
      ],
      output: {
        globals: {
          svelte: "svelte",
          "svelte/internal": "svelte/internal",
          ethers: "ethers",
        },
        dir: "dist",
        format: "esm",
      },
    },
  },
});
