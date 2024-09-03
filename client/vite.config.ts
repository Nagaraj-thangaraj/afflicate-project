import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Customize this if you need specific Node.js built-ins
      // options: { include: ['process'] }
    }),
  ],
  define: {
    "process.env": {}, // Define `process.env` as an empty object if necessary
  },
  build: {
    outDir: "dist", // Ensure this matches your Render Publish Directory
  },
});
