import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

// Vite config for a simple React project
export default defineConfig({
  plugins: [
    // Vite expects JSX to be in .jsx/.tsx files.
    // This small plugin tells Vite to ALSO treat src/**/*.js as JSX,
    // so we can keep the beginner-friendly ".js" filenames.
    {
      name: "treat-js-as-jsx",
      async transform(code, id) {
        // Only transform our own src files (not node_modules).
        if (!/\/src\/.*\.js$/.test(id)) return null;

        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic"
        });
      }
    },
    react()
  ],
  optimizeDeps: {
    // This helps the dev server pre-bundle dependencies consistently.
    esbuildOptions: {
      loader: { ".js": "jsx" }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});

