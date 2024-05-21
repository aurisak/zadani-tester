import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '5okp9f',
  // fix the __SENTRY__ security error
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
