const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  pageLoadTimeout: 30000,
  video: true,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  experimentalStudio: true,
  env: {
    VALID_USERNAME: 'a',
    VALID_PASSWORD: 'a',
    INVALID_USERNAME: 'wronguser',
    INVALID_PASSWORD: 'invalidpass',
    INVALID_AMOUNT: 'a',
    VALID_AMOUNT: '12',
    NEW_FIRST_NAME: 'John',
    NEW_LAST_NAME: 'Updated',
    NEW_ADDRESS: '456 New Street',
    NEW_CITY: 'Boston',
    NEW_STATE: 'MA',
    NEW_ZIPCODE: '02101',
    NEW_PHONE: '555-9999',
    PAYEE_NAME: 'Electric Company',
    PAYEE_ADDRESS: '789 Power St',
    PAYEE_CITY: 'Energy City',
    PAYEE_STATE: 'CA',
    PAYEE_ZIPCODE: '90001',
    PAYEE_PHONE: '555-1234',
    ACCOUNT_NUMBER: '54321',
    BILL_AMOUNT: '150.00',
    INVALID_BILL_AMOUNT: '-50.00'
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss'
  },
  e2e: {
    baseUrl: 'https://parabank.parasoft.com/parabank/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    downloadsFolder: 'cypress/downloads',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos'
  }
})
