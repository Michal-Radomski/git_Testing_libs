import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      "transitive-js": "/node_modules/transitive-js/dist/index.js",
    },
  },
});
