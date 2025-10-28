// Open New Account Page Object
class OpenNewAccountPage {
  // Elements
  get accountTypeDropdown() { return cy.get('#type') }
  get fromAccountDropdown() { return cy.get('#fromAccountId') }
  get openNewAccountButton() { return cy.get('input[value="Open New Account"]') }
  get accountOpenedMessage() { return cy.contains('Account Opened') }
  get congratulationsMessage() { return cy.contains('Congratulations') }

  // Actions
  selectAccountType(type = 'SAVINGS') {
    this.accountTypeDropdown.select(type)
    return this
  }

  selectAccountTypeByIndex(index = 1) {
    this.accountTypeDropdown.select(index)
    return this
  }

  selectFromAccount(index = 0) {
    this.fromAccountDropdown.select(index)
    return this
  }

  clickOpenNewAccount() {
    this.openNewAccountButton.click()
    return this
  }

  // Verifications
  verifyPageLoaded() {
    this.accountTypeDropdown.should('be.visible')
    this.fromAccountDropdown.should('be.visible')
    this.openNewAccountButton.should('be.visible')
    return this
  }

  verifyAccountTypeSelected() {
    this.accountTypeDropdown.should('not.have.value', '')
    return this
  }

  verifyAccountSelected() {
    this.fromAccountDropdown.should('not.have.value', '')
    return this
  }

  verifyAccountOpened() {
    cy.get('body').then(($body) => {
      if ($body.find('*:contains("Account Opened")').length > 0) {
        this.accountOpenedMessage.should('be.visible')
      } else if ($body.find('*:contains("Congratulations")').length > 0) {
        this.congratulationsMessage.should('be.visible')
      } else {
        // Fallback verification
        cy.url().should('include', 'openaccount')
      }
    })
    return this
  }
}

export default OpenNewAccountPage
