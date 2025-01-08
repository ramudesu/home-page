import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.glb"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext", // Target modern browsers
    outDir: "dist", // Output directory
    // assetsDir: "assets", // Directory to nest generated assets under
    sourcemap: false, // Disable sourcemaps for production
    minify: "esbuild", // Use esbuild for minification
    cssCodeSplit: true, // Enable CSS code splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
