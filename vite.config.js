/* eslint import/no-extraneous-dependencies: "off" */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mdPlugin from "vite-plugin-markdown";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), mdPlugin({mode: "vue"})],
  build: {
    outDir: './docs'
  }
});