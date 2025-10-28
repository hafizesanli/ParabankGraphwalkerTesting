import LoginPage from '../support/pages/LoginPage'
import DashboardPage from '../support/pages/DashboardPage'
import TransferFundsPage from '../support/pages/TransferFundsPage'
import OpenNewAccountPage from '../support/pages/OpenNewAccountPage'
import UpdateProfilePage from '../support/pages/UpdateProfilePage'
import AccountsOverviewPage from '../support/pages/AccountsOverviewPage'
import BillPayPage from '../support/pages/BillPayPage'

describe('ParaBank GraphWalker Tests', () => {
  let loginPage, dashboardPage, transferFundsPage, openNewAccountPage, updateProfilePage, accountsOverviewPage, billPayPage

  beforeEach(() => {
    // Initialize page objects
    loginPage = new LoginPage()
    dashboardPage = new DashboardPage()
    transferFundsPage = new TransferFundsPage()
    openNewAccountPage = new OpenNewAccountPage()
    updateProfilePage = new UpdateProfilePage()
    accountsOverviewPage = new AccountsOverviewPage()
    billPayPage = new BillPayPage()
  })

  // ================= LOGIN PAGE TESTS =================
  
  describe('Login Page Tests', () => {
    it('should start browser and navigate to login page', () => {
      loginPage.visit().verifyPageLoaded()
    })

    it('should enter invalid credentials', () => {
      loginPage
        .visit()
        .enterInvalidCredentials()
        .verifyInvalidCredentialsEntered()
    })

    it('should enter valid credentials', () => {
      loginPage
        .visit()
        .enterValidCredentials()
        .verifyValidCredentialsEntered()
    })

    it('should click login button with invalid credentials and show error', () => {
      loginPage
        .visit()
        .enterInvalidCredentials()
        .clickLogin()
        .verifyErrorDisplayed()
    })

    it('should click login button with valid credentials and reach dashboard', () => {
      loginPage
        .visit()
        .enterValidCredentials()
        .clickLogin()
      
      dashboardPage.verifyPageLoaded()
    })

    it('should retry login after error', () => {
      loginPage
        .visit()
        .enterInvalidCredentials()
        .clickLogin()
        .verifyErrorDisplayed()
        .clearFields()
        .verifyPageLoaded()
    })

    it('should logout from dashboard', () => {
      loginPage
        .visit()
        .enterValidCredentials()
        .clickLogin()
      
      dashboardPage.logout()
      loginPage.verifyPageLoaded()
    })
  })

  // ================= TRANSFER FUNDS TESTS =================
  
  describe('Transfer Funds Tests', () => {
    beforeEach(() => {
      // Login before each transfer test
      loginPage.visit().enterValidCredentials().clickLogin()
      dashboardPage.verifyPageLoaded()
    })

    it('should navigate to transfer funds page', () => {
      dashboardPage.navigateToTransferFunds()
      transferFundsPage.verifyPageLoaded()
    })

    it('should enter valid amount for transfer', () => {
      dashboardPage.navigateToTransferFunds()
      transferFundsPage
        .enterValidAmount()
        .verifyValidAmountEntered()
    })

    it('should enter invalid amount for transfer', () => {
      dashboardPage.navigateToTransferFunds()
      transferFundsPage
        .enterInvalidAmount()
        .verifyInvalidAmountEntered()
    })

    it('should complete transfer with valid amount', () => {
      dashboardPage.navigateToTransferFunds()
      transferFundsPage
        .enterValidAmount()
        .selectFromAccount()
        .selectToAccount()
        .clickTransfer()
        .verifyTransferComplete()
    })

    it('should show validation error with invalid amount', () => {
      dashboardPage.navigateToTransferFunds()
      transferFundsPage
        .enterInvalidAmount()
        .clickTransfer()
        .verifyValidationError()
    })

    it('should return to dashboard from transfer page', () => {
      dashboardPage.navigateToTransferFunds()
      transferFundsPage.verifyPageLoaded()
      dashboardPage.navigateToAccountsOverview()
      dashboardPage.verifyPageLoaded()
    })
  })

  // ================= OPEN NEW ACCOUNT TESTS =================
  
  describe('Open New Account Tests', () => {
    beforeEach(() => {
      loginPage.visit().enterValidCredentials().clickLogin()
      dashboardPage.verifyPageLoaded()
    })

    it('should navigate to open new account page', () => {
      dashboardPage.navigateToOpenNewAccount()
      openNewAccountPage.verifyPageLoaded()
    })

    it('should select account type', () => {
      dashboardPage.navigateToOpenNewAccount()
      openNewAccountPage
        .selectAccountTypeByIndex()
        .verifyAccountTypeSelected()
    })

    it('should select account', () => {
      dashboardPage.navigateToOpenNewAccount()
      openNewAccountPage
        .selectFromAccount()
        .verifyAccountSelected()
    })

    it('should open new account successfully', () => {
      dashboardPage.navigateToOpenNewAccount()
      openNewAccountPage
        .selectAccountTypeByIndex()
        .selectFromAccount()
        .clickOpenNewAccount()
        .verifyAccountOpened()
    })

    it('should return to dashboard after opening account', () => {
      dashboardPage.navigateToOpenNewAccount()
      openNewAccountPage
        .selectAccountTypeByIndex()
        .selectFromAccount()
        .clickOpenNewAccount()
        .verifyAccountOpened()
      
      dashboardPage.navigateToAccountsOverview()
      dashboardPage.verifyPageLoaded()
    })
  })

  // ================= UPDATE PROFILE TESTS =================
  
  describe('Update Profile Tests', () => {
    beforeEach(() => {
      loginPage.visit().enterValidCredentials().clickLogin()
      dashboardPage.verifyPageLoaded()
    })

    it('should navigate to update contact info page', () => {
      dashboardPage.navigateToUpdateContactInfo()
      updateProfilePage.verifyPageLoaded()
    })

    it('should change first name', () => {
      dashboardPage.navigateToUpdateContactInfo()
      updateProfilePage.changeFirstName()
    })

    it('should change last name', () => {
      dashboardPage.navigateToUpdateContactInfo()
      updateProfilePage.changeLastName()
    })

    it('should change address', () => {
      dashboardPage.navigateToUpdateContactInfo()
      updateProfilePage.changeAddress()
    })

    it('should change city', () => {
      dashboardPage.navigateToUpdateContactInfo()
      updateProfilePage.changeCity()
    })

    it('should change state', () => {
      dashboardPage.navigateToUpdateContactInfo()
      updateProfilePage.changeState()
    })

    it('should change zip code', () => {
      dashboardPage.navigateToUpdateContactInfo()
      updateProfilePage.changeZipCode()
    })

    it('should change phone', () => {
      dashboardPage.navigateToUpdateContactInfo()
      updateProfilePage.changePhone()
    })

    it('should update profile successfully', () => {
      dashboardPage.navigateToUpdateContactInfo()
      updateProfilePage
        .fillAllFields()
        .clickUpdateProfile()
        .verifyProfileUpdated()
    })

    it('should return to dashboard after profile update', () => {
      dashboardPage.navigateToUpdateContactInfo()
      updateProfilePage
        .fillAllFields()
        .clickUpdateProfile()
        .verifyProfileUpdated()
      
      dashboardPage.navigateToAccountsOverview()
      dashboardPage.verifyPageLoaded()
    })
  })

  // ================= ACCOUNTS OVERVIEW TESTS =================
  
  describe('Accounts Overview Tests', () => {
    beforeEach(() => {
      loginPage.visit().enterValidCredentials().clickLogin()
      dashboardPage.verifyPageLoaded()
    })

    it('should navigate to accounts overview', () => {
      dashboardPage.navigateToAccountsOverview()
      accountsOverviewPage.verifyPageLoaded()
    })

    it('should click on account number', () => {
      dashboardPage.navigateToAccountsOverview()
      accountsOverviewPage
        .clickRandomAccount()
        .verifyAccountDetailsPage()
    })

    it('should click on transaction', () => {
      dashboardPage.navigateToAccountsOverview()
      accountsOverviewPage
        .clickRandomAccount()
        .verifyAccountDetailsPage()
        .clickFirstTransaction()
        .verifyTransactionDetailsPage()
    })

    it('should return to dashboard from accounts overview', () => {
      dashboardPage.navigateToAccountsOverview()
      accountsOverviewPage.verifyPageLoaded()
      dashboardPage.navigateToAccountsOverview()
      dashboardPage.verifyPageLoaded()
    })
  })

  // ================= BILL PAY TESTS =================
  
  describe('Bill Pay Tests', () => {
    beforeEach(() => {
      loginPage.visit().enterValidCredentials().clickLogin()
      dashboardPage.verifyPageLoaded()
    })

    it('should navigate to bill pay page', () => {
      dashboardPage.navigateToBillPay()
      billPayPage.verifyPageLoaded()
    })

    it('should show empty bill pay form', () => {
      dashboardPage.navigateToBillPay()
      billPayPage.verifyFormEmpty()
    })

    it('should show validation errors when sending empty form', () => {
      dashboardPage.navigateToBillPay()
      billPayPage
        .clickSendEmpty()
        .verifyValidationErrors()
    })

    it('should fill payee name', () => {
      dashboardPage.navigateToBillPay()
      billPayPage
        .fillPayeeName()
        .verifyFormPartiallyFilled()
    })

    it('should fill address', () => {
      dashboardPage.navigateToBillPay()
      billPayPage
        .fillPayeeName()
        .fillAddress()
        .verifyFormPartiallyFilled()
    })

    it('should fill all remaining fields', () => {
      dashboardPage.navigateToBillPay()
      billPayPage
        .fillPayeeName()
        .fillAddress()
        .fillAllFields()
        .verifyFormAllFilled()
    })

    it('should correct errors', () => {
      dashboardPage.navigateToBillPay()
      billPayPage
        .clickSendEmpty()
        .verifyValidationErrors()
        .correctErrors()
        .verifyFormAllFilled()
    })

    it('should send payment with valid data', () => {
      dashboardPage.navigateToBillPay()
      billPayPage
        .fillAllFields()
        .clickSendPayment()
        .verifyBillPaymentComplete()
    })

    it('should send payment with invalid data and show error', () => {
      dashboardPage.navigateToBillPay()
      billPayPage
        .fillAllFields()
        .fillInvalidAmount()
        .clickSendPayment()
        .verifyInvalidData()
    })

    it('should correct invalid data', () => {
      dashboardPage.navigateToBillPay()
      billPayPage
        .fillAllFields()
        .fillInvalidAmount()
        .verifyInvalidData()
        .correctInvalidData()
        .verifyValidData()
    })

    it('should return to dashboard after bill payment', () => {
      dashboardPage.navigateToBillPay()
      billPayPage
        .fillAllFields()
        .clickSendPayment()
        .verifyBillPaymentComplete()
      
      dashboardPage.navigateToAccountsOverview()
      dashboardPage.verifyPageLoaded()
    })
  })

  // ================= COMPREHENSIVE WORKFLOW TESTS =================
  
  describe('Comprehensive Workflow Tests', () => {
    it('should complete full login to logout workflow', () => {
      loginPage
        .visit()
        .enterValidCredentials()
        .clickLogin()
      
      dashboardPage.verifyPageLoaded()
      dashboardPage.logout()
      loginPage.verifyPageLoaded()
    })

    it('should complete transfer funds workflow', () => {
      loginPage
        .visit()
        .enterValidCredentials()
        .clickLogin()
      
      dashboardPage
        .verifyPageLoaded()
        .navigateToTransferFunds()
      
      transferFundsPage
        .verifyPageLoaded()
        .enterValidAmount()
        .selectFromAccount()
        .selectToAccount()
        .clickTransfer()
        .verifyTransferComplete()
      
      dashboardPage.navigateToAccountsOverview()
      dashboardPage.verifyPageLoaded()
    })

    it('should complete open new account workflow', () => {
      loginPage
        .visit()
        .enterValidCredentials()
        .clickLogin()
      
      dashboardPage
        .verifyPageLoaded()
        .navigateToOpenNewAccount()
      
      openNewAccountPage
        .verifyPageLoaded()
        .selectAccountTypeByIndex()
        .selectFromAccount()
        .clickOpenNewAccount()
        .verifyAccountOpened()
      
      dashboardPage.navigateToAccountsOverview()
      dashboardPage.verifyPageLoaded()
    })

    it('should complete update profile workflow', () => {
      loginPage
        .visit()
        .enterValidCredentials()
        .clickLogin()
      
      dashboardPage
        .verifyPageLoaded()
        .navigateToUpdateContactInfo()
      
      updateProfilePage
        .verifyPageLoaded()
        .fillAllFields()
        .clickUpdateProfile()
        .verifyProfileUpdated()
      
      dashboardPage.navigateToAccountsOverview()
      dashboardPage.verifyPageLoaded()
    })

    it('should complete bill pay workflow', () => {
      loginPage
        .visit()
        .enterValidCredentials()
        .clickLogin()
      
      dashboardPage
        .verifyPageLoaded()
        .navigateToBillPay()
      
      billPayPage
        .verifyPageLoaded()
        .fillAllFields()
        .clickSendPayment()
        .verifyBillPaymentComplete()
      
      dashboardPage.navigateToAccountsOverview()
      dashboardPage.verifyPageLoaded()
    })
  })
})
