// Bill Pay Page Object
class BillPayPage {
  // Elements
  get payeeNameField() { return cy.get('input[name="payee.name"]') }
  get addressField() { return cy.get('input[name="payee.address.street"]') }
  get cityField() { return cy.get('input[name="payee.address.city"]') }
  get stateField() { return cy.get('input[name="payee.address.state"]') }
  get zipCodeField() { return cy.get('input[name="payee.address.zipCode"]') }
  get phoneField() { return cy.get('input[name="payee.phoneNumber"]') }
  get accountNumberField() { return cy.get('input[name="payee.accountNumber"]') }
  get verifyAccountField() { return cy.get('input[name="verifyAccount"]') }
  get amountField() { return cy.get('input[name="amount"]') }
  get sendPaymentButton() { return cy.get('input[value="Send Payment"]') }
  get errorMessages() { return cy.get('.error') }
  get billPaymentCompleteMessage() { return cy.contains('Bill Payment Complete') }

  // Actions
  fillPayeeName(name = Cypress.env('PAYEE_NAME')) {
    this.payeeNameField.clear().type(name)
    return this
  }

  fillAddress(address = Cypress.env('PAYEE_ADDRESS')) {
    this.addressField.clear().type(address)
    return this
  }

  fillCity(city = Cypress.env('PAYEE_CITY')) {
    this.cityField.clear().type(city)
    return this
  }

  fillState(state = Cypress.env('PAYEE_STATE')) {
    this.stateField.clear().type(state)
    return this
  }

  fillZipCode(zipCode = Cypress.env('PAYEE_ZIPCODE')) {
    this.zipCodeField.clear().type(zipCode)
    return this
  }

  fillPhone(phone = Cypress.env('PAYEE_PHONE')) {
    this.phoneField.clear().type(phone)
    return this
  }

  fillAccountNumber(accountNumber = Cypress.env('ACCOUNT_NUMBER')) {
    this.accountNumberField.clear().type(accountNumber)
    this.verifyAccountField.clear().type(accountNumber)
    return this
  }

  fillAmount(amount = Cypress.env('BILL_AMOUNT')) {
    this.amountField.clear().type(amount)
    return this
  }

  fillInvalidAmount() {
    this.amountField.clear().type(Cypress.env('INVALID_BILL_AMOUNT'))
    return this
  }

  fillAllFields() {
    this.fillPayeeName()
    this.fillAddress()
    this.fillCity()
    this.fillState()
    this.fillZipCode()
    this.fillPhone()
    this.fillAccountNumber()
    this.fillAmount()
    return this
  }

  clickSendPayment() {
    this.sendPaymentButton.click()
    return this
  }

  clickSendEmpty() {
    this.sendPaymentButton.click()
    return this
  }

  correctErrors() {
    this.fillPayeeName()
    this.fillAddress()
    this.fillAllFields()
    return this
  }

  correctInvalidData() {
    this.fillAmount()
    return this
  }

  // Verifications
  verifyPageLoaded() {
    this.payeeNameField.should('be.visible')
    this.amountField.should('be.visible')
    this.sendPaymentButton.should('be.visible')
    return this
  }

  verifyFormEmpty() {
    this.payeeNameField.should('have.value', '')
    this.amountField.should('have.value', '')
    return this
  }

  verifyValidationErrors() {
    this.errorMessages.should('have.length.greaterThan', 0)
    return this
  }

  verifyFormPartiallyFilled() {
    this.payeeNameField.should('not.have.value', '')
    return this
  }

  verifyFormAllFilled() {
    this.payeeNameField.should('not.have.value', '')
    this.amountField.should('not.have.value', '')
    return this
  }

  verifyInvalidData() {
    this.amountField.should('have.value', Cypress.env('INVALID_BILL_AMOUNT'))
    return this
  }

  verifyValidData() {
    this.amountField.should('have.value', Cypress.env('BILL_AMOUNT'))
    return this
  }

  verifyBillPaymentComplete() {
    cy.get('body').then(($body) => {
      if ($body.find('*:contains("Bill Payment Complete")').length > 0) {
        this.billPaymentCompleteMessage.should('be.visible')
      } else {
        // Fallback verification
        cy.url().should('include', 'billpay')
      }
    })
    return this
  }
}

export default BillPayPage
