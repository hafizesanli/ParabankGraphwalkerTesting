// Dashboard Page Object
class DashboardPage {
  // Elements
  get accountsOverviewLink() { return cy.contains('Accounts Overview') }
  get transferFundsLink() { return cy.contains('Transfer Funds') }
  get openNewAccountLink() { return cy.contains('Open New Account') }
  get updateContactInfoLink() { return cy.contains('Update Contact Info') }
  get billPayLink() { return cy.contains('Bill Pay') }
  get logoutLink() { return cy.contains('Log Out') }
  get accountsOverviewTitle() { return cy.get('h1').contains('Accounts Overview') }

  // Actions
  navigateToAccountsOverview() {
    this.accountsOverviewLink.click()
    return this
  }

  navigateToTransferFunds() {
    this.transferFundsLink.click()
    return this
  }

  navigateToOpenNewAccount() {
    this.openNewAccountLink.click()
    return this
  }

  navigateToUpdateContactInfo() {
    this.updateContactInfoLink.click()
    return this
  }

  navigateToBillPay() {
    this.billPayLink.click()
    return this
  }

  logout() {
    this.logoutLink.click()
    return this
  }

  // Verifications
  verifyPageLoaded() {
    this.accountsOverviewTitle.should('be.visible')
    this.logoutLink.should('be.visible')
    return this
  }

  verifyNavigationLinksVisible() {
    this.transferFundsLink.should('be.visible')
    this.openNewAccountLink.should('be.visible')
    this.updateContactInfoLink.should('be.visible')
    this.billPayLink.should('be.visible')
    return this
  }
}

export default DashboardPage
