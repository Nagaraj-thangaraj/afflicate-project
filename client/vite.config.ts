// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // you can specify the Node.js built-ins you need here
      // for example, if you only need `process`, you can specify it here
      // options: { include: ['process'] }
    }),
  ],
  define: {
    "process.env": {}, // Optional: Define `process.env` as an empty object if needed
  },
});
