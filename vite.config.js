import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import {sentryVitePlugin} from '@sentry/vite-plugin';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: false,
      },
    }),
    /* sentryVitePlugin({
      authToken:'197ef15f82fa47d088d5ac0b7a638c77012a373a15e2469b80da2c217ed16b92',
      org:"matka-2p",
      project:"javscript-react"
    }) */
  ],
});
