// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Import page objects
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import TransferFundsPage from './pages/TransferFundsPage'
import OpenNewAccountPage from './pages/OpenNewAccountPage'
import UpdateProfilePage from './pages/UpdateProfilePage'
import AccountsOverviewPage from './pages/AccountsOverviewPage'
import BillPayPage from './pages/BillPayPage'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

// Custom commands for GraphWalker-like functionality
Cypress.Commands.add('visitParabank', () => {
  cy.visit('/')
})

Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible')
})

Cypress.Commands.add('waitForText', (text, timeout = 10000) => {
  cy.contains(text, { timeout }).should('be.visible')
})

Cypress.Commands.add('randomSelect', (selector) => {
  cy.get(selector).then(($elements) => {
    const randomIndex = Math.floor(Math.random() * $elements.length)
    cy.wrap($elements[randomIndex]).click()
  })
})

Cypress.Commands.add('scrollToElement', (selector) => {
  cy.get(selector).scrollIntoView()
})

Cypress.Commands.add('verifyElementExists', (selector) => {
  cy.get(selector).should('exist')
})

Cypress.Commands.add('verifyElementVisible', (selector) => {
  cy.get(selector).should('be.visible')
})

Cypress.Commands.add('verifyElementNotVisible', (selector) => {
  cy.get(selector).should('not.be.visible')
})

Cypress.Commands.add('verifyTextContent', (selector, expectedText) => {
  cy.get(selector).should('contain.text', expectedText)
})

Cypress.Commands.add('verifyUrlContains', (text) => {
  cy.url().should('include', text)
})

Cypress.Commands.add('verifyPageTitle', (expectedTitle) => {
  cy.title().should('include', expectedTitle)
})
