import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'cfhv1d',
  chromeWebSecurity: false,
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 60000,
  videoUploadOnPasses: false,
  env: {
    lang: {
      English: 'en',
      Arabic: 'ar',
    },
    country: {
      UAE: 'ae',
      Saudi: 'sa',
    },
    isResponsive: false
  },
  viewportWidth: 1440,
  viewportHeight: 900,
  retries: {
    runMode: 1,
    openMode: 1,
  },
  //experimentalStudio: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome',
    mochawesomeReporterOptions: {
      reportDir: 'cypress/reports/mochawesome-report',
      reportFilename: 'report',
      reportTitle: 'web-automation-report',
      inlineAssets: true,
      overwrite: true,
      quite: true,
      html: true,
      json: false,
    },
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'https://www.propertyfinder.bh/',
    //experimentalSessionAndOrigin: true,
    specPattern: 'cypress/e2e/**/*.feature',
    downloadsFolder:'cypress/fixtures/downloads',
    
  },
});
