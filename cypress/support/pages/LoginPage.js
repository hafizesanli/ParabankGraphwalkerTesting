// Login Page Object
class LoginPage {
  // Elements
  get usernameField() { return cy.get('input[name="username"]') }
  get passwordField() { return cy.get('input[name="password"]') }
  get loginButton() { return cy.get('input[value="Log In"]') }
  get errorMessage() { return cy.get('.error') }

  // Actions
  visit() {
    cy.visit('/')
    return this
  }

  enterCredentials(username, password) {
    this.usernameField.clear().type(username)
    this.passwordField.clear().type(password)
    return this
  }

  enterValidCredentials() {
    this.usernameField.clear().type(Cypress.env('VALID_USERNAME'))
    this.passwordField.clear().type(Cypress.env('VALID_PASSWORD'))
    return this
  }

  enterInvalidCredentials() {
    this.usernameField.clear().type(Cypress.env('INVALID_USERNAME'))
    this.passwordField.clear().type(Cypress.env('INVALID_PASSWORD'))
    return this
  }

  clickLogin() {
    this.loginButton.click()
    return this
  }

  clearFields() {
    this.usernameField.clear()
    this.passwordField.clear()
    return this
  }

  // Verifications
  verifyPageLoaded() {
    this.usernameField.should('be.visible')
    this.passwordField.should('be.visible')
    this.loginButton.should('be.visible')
    return this
  }

  verifyInvalidCredentialsEntered() {
    this.usernameField.should('have.value', Cypress.env('INVALID_USERNAME'))
    return this
  }

  verifyValidCredentialsEntered() {
    this.usernameField.should('have.value', Cypress.env('VALID_USERNAME'))
    return this
  }

  verifyErrorDisplayed() {
    this.errorMessage.should('be.visible')
    return this
  }
}

export default LoginPage
