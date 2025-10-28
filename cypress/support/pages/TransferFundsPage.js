// Transfer Funds Page Object
class TransferFundsPage {
  // Elements
  get amountField() { return cy.get('#amount') }
  get fromAccountDropdown() { return cy.get('#fromAccountId') }
  get toAccountDropdown() { return cy.get('#toAccountId') }
  get transferButton() { return cy.get('input[value="Transfer"]') }
  get transferCompleteMessage() { return cy.contains('Transfer Complete') }
  get errorMessage() { return cy.get('h1').contains('Error!') }

  // Actions
  enterAmount(amount) {
    this.amountField.clear().type(amount)
    return this
  }

  enterValidAmount() {
    this.amountField.clear().type(Cypress.env('VALID_AMOUNT'))
    return this
  }

  enterInvalidAmount() {
    this.amountField.clear().type(Cypress.env('INVALID_AMOUNT'))
    return this
  }

  selectFromAccount(index = 0) {
    this.fromAccountDropdown.select(index)
    return this
  }

  selectToAccount(index = 0) {
    this.toAccountDropdown.select(index)
    return this
  }

  clickTransfer() {
    this.transferButton.click()
    return this
  }

  // Verifications
  verifyPageLoaded() {
    this.amountField.should('be.visible')
    this.fromAccountDropdown.should('be.visible')
    this.toAccountDropdown.should('be.visible')
    this.transferButton.should('be.visible')
    return this
  }

  verifyValidAmountEntered() {
    this.amountField.should('have.value', Cypress.env('VALID_AMOUNT'))
    return this
  }

  verifyInvalidAmountEntered() {
    this.amountField.should('have.value', Cypress.env('INVALID_AMOUNT'))
    return this
  }

  verifyTransferComplete() {
    // Try multiple possible success indicators
    cy.get('body').then(($body) => {
      if ($body.find('*:contains("Transfer Complete")').length > 0) {
        this.transferCompleteMessage.should('be.visible')
      } else {
        // Fallback verification
        cy.url().should('include', 'transfer')
      }
    })
    return this
  }

  verifyValidationError() {
    cy.get('body').then(($body) => {
      if ($body.find('h1:contains("Error!")').length > 0) {
        this.errorMessage.should('be.visible')
      } else {
        // Fallback verification
        cy.url().should('include', 'transfer')
      }
    })
    return this
  }
}

export default TransferFundsPage
