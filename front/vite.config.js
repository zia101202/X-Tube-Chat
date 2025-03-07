import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // ✅ Change port if needed (default is 5173)
    open: true, // ✅ Auto-open browser on start
    cors: true, // ✅ Enable CORS if required
    proxy: {
      "/api": {
        target: "http://localhost:5000", // ✅ Redirect API calls to backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

