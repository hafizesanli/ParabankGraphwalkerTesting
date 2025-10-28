// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom commands for ParaBank testing
Cypress.Commands.add('login', (username, password) => {
  cy.get('input[name="username"]').clear().type(username)
  cy.get('input[name="password"]').clear().type(password)
  cy.get('input[value="Log In"]').click()
})

Cypress.Commands.add('logout', () => {
  cy.contains('Log Out').click()
})

Cypress.Commands.add('navigateToTransferFunds', () => {
  cy.contains('Transfer Funds').click()
})

Cypress.Commands.add('navigateToOpenNewAccount', () => {
  cy.contains('Open New Account').click()
})

Cypress.Commands.add('navigateToAccountsOverview', () => {
  cy.contains('Accounts Overview').click()
})

Cypress.Commands.add('navigateToUpdateContactInfo', () => {
  cy.contains('Update Contact Info').click()
})

Cypress.Commands.add('navigateToBillPay', () => {
  cy.contains('Bill Pay').click()
})

Cypress.Commands.add('fillTransferForm', (amount) => {
  cy.get('#amount').clear().type(amount)
  cy.get('#fromAccountId').select(0)
  cy.get('#toAccountId').select(1)
})

Cypress.Commands.add('fillNewAccountForm', (accountType) => {
  cy.get('#type').select(accountType)
  cy.get('#fromAccountId').select(0)
})

Cypress.Commands.add('fillProfileForm', (profileData) => {
  cy.get('#customer\\.firstName').clear().type(profileData.firstName)
  cy.get('#customer\\.lastName').clear().type(profileData.lastName)
  cy.get('#customer\\.address\\.street').clear().type(profileData.address)
  cy.get('#customer\\.address\\.city').clear().type(profileData.city)
  cy.get('#customer\\.address\\.state').clear().type(profileData.state)
  cy.get('#customer\\.address\\.zipCode').clear().type(profileData.zipCode)
  cy.get('#customer\\.phoneNumber').clear().type(profileData.phone)
})

Cypress.Commands.add('fillBillPayForm', (billData) => {
  cy.get('input[name="payee.name"]').clear().type(billData.payeeName)
  cy.get('input[name="payee.address.street"]').clear().type(billData.address)
  cy.get('input[name="payee.address.city"]').clear().type(billData.city)
  cy.get('input[name="payee.address.state"]').clear().type(billData.state)
  cy.get('input[name="payee.address.zipCode"]').clear().type(billData.zipCode)
  cy.get('input[name="payee.phoneNumber"]').clear().type(billData.phone)
  cy.get('input[name="payee.accountNumber"]').clear().type(billData.accountNumber)
  cy.get('input[name="verifyAccount"]').clear().type(billData.accountNumber)
  cy.get('input[name="amount"]').clear().type(billData.amount)
})

Cypress.Commands.add('verifyLoginPage', () => {
  cy.get('input[name="username"]').should('be.visible')
  cy.get('input[name="password"]').should('be.visible')
})

Cypress.Commands.add('verifyDashboard', () => {
  cy.contains('Accounts Overview').should('be.visible')
  cy.contains('Log Out').should('be.visible')
})

Cypress.Commands.add('verifyTransferFundsPage', () => {
  cy.get('#amount').should('be.visible')
  cy.get('#fromAccountId').should('be.visible')
  cy.get('#toAccountId').should('be.visible')
})

Cypress.Commands.add('verifyOpenAccountPage', () => {
  cy.get('#type').should('be.visible')
  cy.get('#fromAccountId').should('be.visible')
})

Cypress.Commands.add('verifyAccountsOverviewPage', () => {
  cy.get('#accountTable').should('be.visible')
})

Cypress.Commands.add('verifyUpdateProfilePage', () => {
  cy.get('#customer\\.firstName').should('be.visible')
  cy.get('#customer\\.lastName').should('be.visible')
  cy.get('#customer\\.address\\.street').should('be.visible')
})

Cypress.Commands.add('verifyBillPayPage', () => {
  cy.get('input[name="payee.name"]').should('be.visible')
  cy.get('input[name="amount"]').should('be.visible')
})

Cypress.Commands.add('verifyError', () => {
  cy.get('.error').should('be.visible')
})

Cypress.Commands.add('verifySuccess', (successText) => {
  cy.contains(successText).should('be.visible')
})

Cypress.Commands.add('clickRandomAccount', () => {
  cy.get('#accountTable tbody tr').then(($rows) => {
    const randomIndex = Math.floor(Math.random() * $rows.length)
    cy.wrap($rows[randomIndex]).find('a').first().click()
  })
})

Cypress.Commands.add('clickRandomTransaction', () => {
  cy.get('#transactionTable a').first().click()
})
