import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "admin-handler",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Redirect /admin to /admin/
          if (req.url === "/admin") {
            res.writeHead(302, { Location: "/admin/" });
            res.end();
            return;
          }
          // Serve /admin/ as /admin/index.html
          if (req.url === "/admin/") {
            req.url = "/admin/index.html";
          }
          next();
        });
      },
    },
    react(),
    tailwindcss(),
  ],
  // Use MPA mode - this disables SPA fallback entirely
  // We'll handle SPA routing via HashRouter in main.jsx (which is already the case)
  appType: "mpa",
});
