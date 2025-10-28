// Accounts Overview Page Object
class AccountsOverviewPage {
  // Elements
  get accountsTable() { return cy.get('#accountTable') }
  get accountLinks() { return cy.get('#accountTable tbody tr td a') }
  get accountIdElement() { return cy.get('#accountId') }
  get accountTypeElement() { return cy.get('#accountType') }
  get transactionTable() { return cy.get('#transactionTable') }
  get transactionLinks() { return cy.get('#transactionTable a') }
  get transactionDetailsTitle() { return cy.get('h1').contains('Transaction Details') }

  // Actions
  clickRandomAccount() {
    cy.get('#accountTable tbody tr').then(($rows) => {
      const randomIndex = Math.floor(Math.random() * $rows.length)
      cy.wrap($rows[randomIndex]).find('a').first().click()
    })
    return this
  }

  clickFirstTransaction() {
    this.transactionLinks.first().click()
    return this
  }

  // Verifications
  verifyPageLoaded() {
    this.accountsTable.should('be.visible')
    return this
  }

  verifyAccountDetailsPage() {
    this.accountIdElement.should('be.visible')
    this.accountTypeElement.should('be.visible')
    return this
  }

  verifyTransactionDetailsPage() {
    this.transactionDetailsTitle.should('be.visible')
    return this
  }

  verifyAccountsTableHasData() {
    this.accountsTable.find('tbody tr').should('have.length.greaterThan', 0)
    return this
  }
}

export default AccountsOverviewPage
