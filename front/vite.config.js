import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // ✅ Ensures correct path resolution in Netlify

  build: {
    outDir: "dist", // ✅ Netlify needs the built folder to be `dist`
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
      },
    },
  },

  server: {
    port: 5173,
    open: true,
    cors: true,
    proxy: {
      // ❌ This proxy won't work on Netlify, use a real API URL instead
      "/api": {
        target: "https://your-backend-url.com", // ✅ Replace with your actual backend URL
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
