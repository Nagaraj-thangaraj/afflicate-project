import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [], // Add external dependencies here if needed
    },
  },
});
