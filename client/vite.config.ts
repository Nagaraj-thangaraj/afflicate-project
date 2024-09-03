import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Optional: Specify Node.js built-ins you need here
      // options: { include: ['process'] }
    }),
  ],
  define: {
    "process.env": {}, // Optional: Define `process.env` as an empty object if needed
  },
  build: {
    outDir: "dist", // This is the output directory for your build
  },
});
