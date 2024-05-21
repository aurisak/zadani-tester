import { defineConfig } from "cypress";

export default defineConfig({
  // fix the __SENTRY__ security error
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
