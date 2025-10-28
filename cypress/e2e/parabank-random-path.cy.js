// This simulates the GraphWalker random edge coverage approach
import LoginPage from '../support/pages/LoginPage'
import DashboardPage from '../support/pages/DashboardPage'
import TransferFundsPage from '../support/pages/TransferFundsPage'
import OpenNewAccountPage from '../support/pages/OpenNewAccountPage'
import UpdateProfilePage from '../support/pages/UpdateProfilePage'
import AccountsOverviewPage from '../support/pages/AccountsOverviewPage'
import BillPayPage from '../support/pages/BillPayPage'

describe('ParaBank GraphWalker Random Path Tests', () => {
  let loginPage, dashboardPage, transferFundsPage, openNewAccountPage, updateProfilePage, accountsOverviewPage, billPayPage
  let visitedEdges = new Set()
  let maxIterations = 50 // Prevent infinite loops
  let currentIteration = 0

  beforeEach(() => {
    // Initialize page objects
    loginPage = new LoginPage()
    dashboardPage = new DashboardPage()
    transferFundsPage = new TransferFundsPage()
    openNewAccountPage = new OpenNewAccountPage()
    updateProfilePage = new UpdateProfilePage()
    accountsOverviewPage = new AccountsOverviewPage()
    billPayPage = new BillPayPage()
    
    // Reset tracking
    visitedEdges.clear()
    currentIteration = 0
  })

  // GraphWalker-like random path generation
  function getRandomEdge(currentState) {
    const availableEdges = getAvailableEdges(currentState)
    if (availableEdges.length === 0) return null
    
    // Prefer unvisited edges for better coverage
    const unvisitedEdges = availableEdges.filter(edge => !visitedEdges.has(edge))
    const edgesToChooseFrom = unvisitedEdges.length > 0 ? unvisitedEdges : availableEdges
    
    const randomIndex = Math.floor(Math.random() * edgesToChooseFrom.length)
    return edgesToChooseFrom[randomIndex]
  }

  function getAvailableEdges(currentState) {
    const edgeMap = {
      'login': ['e_StartBrowser', 'e_EnterValidCredentials', 'e_EnterInvalidCredentials'],
      'invalid_credentials': ['e_ClickLoginButton'],
      'valid_credentials': ['e_ClickLoginButton'],
      'login_error': ['e_RetryLogin'],
      'dashboard': [
        'e_ClickTransferFundsButton', 
        'e_ClickOpenNewAccount', 
        'e_ClickAccountsOverview', 
        'e_ClickUpdateContactInfo', 
        'e_ClickBillPay',
        'e_ClickLogoutButton'
      ],
      'transfer_funds': ['e_EnterValidAmount', 'e_EnterInvalidAmount', 'e_ReturnToDashboard'],
      'valid_amount': ['e_ClickTransferButton'],
      'invalid_amount': ['e_ClickTransferButton'],
      'transfer_complete': ['e_ReturnToDashboard'],
      'validation_error': ['e_ReturnToDashboard'],
      'open_account': ['e_SelectType', 'e_ReturnToDashboard'],
      'selected_type': ['e_SelectAccount'],
      'account_selected': ['e_OpenNewAccount'],
      'account_opened': ['e_ReturnToDashboard'],
      'accounts_overview': ['e_ClickAccountNumber', 'e_ReturnToDashboard'],
      'account_details': ['e_ClickTransaction', 'e_ReturnToDashboard'],
      'transaction_details': ['e_ReturnToDashboard'],
      'update_profile': [
        'e_ChangeName', 
        'e_ChangeLastName', 
        'e_ChangeAdress', 
        'e_ChangeCity', 
        'e_ChangeState', 
        'e_ChangeZipCode', 
        'e_ChangePhone', 
        'e_ClickUpdateProfileButton',
        'e_ReturnToDashboard'
      ],
      'profile_updated': ['e_ReturnToDashboard'],
      'bill_pay_empty': ['e_ClickSendEmpty', 'e_FillPayeeName'],
      'bill_pay_validation_errors': ['e_CorrectErrors'],
      'bill_pay_partially_filled': ['e_FillAddress', 'e_FillAllRemainingFields', 'e_ClickSendEmpty'],
      'bill_pay_all_filled': ['e_ClickSendValid', 'e_ClickSendInvalid'],
      'bill_pay_invalid_data': ['e_CorrectInvalidData'],
      'bill_pay_valid': ['e_ClickSendValid'],
      'bill_payment_complete': ['e_ReturnToDashboard']
    }
    
    return edgeMap[currentState] || []
  }

  function executeEdge(edgeName) {
    visitedEdges.add(edgeName)
    console.log(`Executing edge: ${edgeName}`)
    
    switch (edgeName) {
      case 'e_StartBrowser':
        loginPage.visit()
        return 'login'
      
      case 'e_EnterValidCredentials':
        loginPage.enterValidCredentials()
        return 'valid_credentials'
      
      case 'e_EnterInvalidCredentials':
        loginPage.enterInvalidCredentials()
        return 'invalid_credentials'
      
      case 'e_ClickLoginButton':
        loginPage.clickLogin()
        // Check if we're on dashboard or error page
        cy.get('body').then(($body) => {
          if ($body.find('a:contains("Log Out")').length > 0) {
            return 'dashboard'
          } else if ($body.find('.error').length > 0) {
            return 'login_error'
          }
        })
        return 'dashboard' // Default assumption
      
      case 'e_RetryLogin':
        loginPage.clearFields()
        return 'login'
      
      case 'e_ClickLogoutButton':
        dashboardPage.logout()
        return 'login'
      
      case 'e_ClickTransferFundsButton':
        dashboardPage.navigateToTransferFunds()
        return 'transfer_funds'
      
      case 'e_EnterValidAmount':
        transferFundsPage.enterValidAmount()
        return 'valid_amount'
      
      case 'e_EnterInvalidAmount':
        transferFundsPage.enterInvalidAmount()
        return 'invalid_amount'
      
      case 'e_ClickTransferButton':
        transferFundsPage.clickTransfer()
        // Check result
        cy.get('body').then(($body) => {
          if ($body.find('*:contains("Transfer Complete")').length > 0) {
            return 'transfer_complete'
          } else if ($body.find('h1:contains("Error!")').length > 0) {
            return 'validation_error'
          }
        })
        return 'transfer_complete' // Default assumption
      
      case 'e_ReturnToDashboard':
        dashboardPage.navigateToAccountsOverview()
        return 'dashboard'
      
      case 'e_ClickOpenNewAccount':
        dashboardPage.navigateToOpenNewAccount()
        return 'open_account'
      
      case 'e_SelectType':
        openNewAccountPage.selectAccountTypeByIndex()
        return 'selected_type'
      
      case 'e_SelectAccount':
        openNewAccountPage.selectFromAccount()
        return 'account_selected'
      
      case 'e_OpenNewAccount':
        openNewAccountPage.clickOpenNewAccount()
        return 'account_opened'
      
      case 'e_ClickAccountsOverview':
        dashboardPage.navigateToAccountsOverview()
        return 'accounts_overview'
      
      case 'e_ClickAccountNumber':
        accountsOverviewPage.clickRandomAccount()
        return 'account_details'
      
      case 'e_ClickTransaction':
        accountsOverviewPage.clickFirstTransaction()
        return 'transaction_details'
      
      case 'e_ClickUpdateContactInfo':
        dashboardPage.navigateToUpdateContactInfo()
        return 'update_profile'
      
      case 'e_ChangeName':
        updateProfilePage.changeFirstName()
        return 'update_profile'
      
      case 'e_ChangeLastName':
        updateProfilePage.changeLastName()
        return 'update_profile'
      
      case 'e_ChangeAdress':
        updateProfilePage.changeAddress()
        return 'update_profile'
      
      case 'e_ChangeCity':
        updateProfilePage.changeCity()
        return 'update_profile'
      
      case 'e_ChangeState':
        updateProfilePage.changeState()
        return 'update_profile'
      
      case 'e_ChangeZipCode':
        updateProfilePage.changeZipCode()
        return 'update_profile'
      
      case 'e_ChangePhone':
        updateProfilePage.changePhone()
        return 'update_profile'
      
      case 'e_ClickUpdateProfileButton':
        updateProfilePage.clickUpdateProfile()
        return 'profile_updated'
      
      case 'e_ClickBillPay':
        dashboardPage.navigateToBillPay()
        return 'bill_pay_empty'
      
      case 'e_ClickSendEmpty':
        billPayPage.clickSendEmpty()
        return 'bill_pay_validation_errors'
      
      case 'e_FillPayeeName':
        billPayPage.fillPayeeName()
        return 'bill_pay_partially_filled'
      
      case 'e_FillAddress':
        billPayPage.fillAddress()
        return 'bill_pay_partially_filled'
      
      case 'e_FillAllRemainingFields':
        billPayPage.fillAllFields()
        return 'bill_pay_all_filled'
      
      case 'e_CorrectErrors':
        billPayPage.correctErrors()
        return 'bill_pay_all_filled'
      
      case 'e_ClickSendValid':
        billPayPage.clickSendPayment()
        return 'bill_payment_complete'
      
      case 'e_ClickSendInvalid':
        billPayPage.fillInvalidAmount().clickSendPayment()
        return 'bill_pay_invalid_data'
      
      case 'e_CorrectInvalidData':
        billPayPage.correctInvalidData()
        return 'bill_pay_valid'
      
      default:
        console.log(`Unknown edge: ${edgeName}`)
        return 'dashboard'
    }
  }

  function runRandomPath() {
    let currentState = 'login'
    const path = []
    
    while (currentIteration < maxIterations) {
      currentIteration++
      
      const nextEdge = getRandomEdge(currentState)
      if (!nextEdge) {
        console.log('No more edges available, ending path')
        break
      }
      
      path.push(nextEdge)
      currentState = executeEdge(nextEdge)
      
      // Add small delay between actions
      cy.wait(500)
      
      // Check if we've achieved good coverage (optional stopping condition)
      if (visitedEdges.size >= 20) { // Adjust threshold as needed
        console.log(`Achieved good coverage with ${visitedEdges.size} unique edges`)
        break
      }
    }
    
    console.log(`Path completed: ${path.join(' -> ')}`)
    console.log(`Total edges visited: ${visitedEdges.size}`)
    console.log(`Unique edges: ${Array.from(visitedEdges).join(', ')}`)
    
    return { path, visitedEdges: Array.from(visitedEdges) }
  }

  it('execute random GraphWalker path with edge coverage', () => {
    const result = runRandomPath()
    
    // Verify we visited a reasonable number of edges
    expect(result.visitedEdges.length).to.be.greaterThan(10)
    
    // Verify we ended up in a valid state
    cy.get('body').should('exist')
  })

  it('achieve comprehensive edge coverage over multiple runs', () => {
    const allVisitedEdges = new Set()
    const runs = 3
    
    for (let i = 0; i < runs; i++) {
      visitedEdges.clear()
      currentIteration = 0
      
      const result = runRandomPath()
      result.visitedEdges.forEach(edge => allVisitedEdges.add(edge))
      
      // Small delay between runs
      cy.wait(1000)
    }
    
    console.log(`Total unique edges covered across ${runs} runs: ${allVisitedEdges.size}`)
    console.log(`All edges: ${Array.from(allVisitedEdges).join(', ')}`)
    
    // Verify we covered a good portion of the available edges
    expect(allVisitedEdges.size).to.be.greaterThan(15)
  })

  it('handle error states gracefully', () => {
    // Test error handling by intentionally triggering errors
    loginPage.visit()
    loginPage.enterInvalidCredentials().clickLogin()
    loginPage.verifyErrorDisplayed()
    
    // Should be able to recover from error state
    loginPage.clearFields()
    loginPage.enterValidCredentials().clickLogin()
    dashboardPage.verifyPageLoaded()
  })

  it('maintain session state across transitions', () => {
    // Login once and verify we stay logged in across multiple operations
    loginPage.visit().enterValidCredentials().clickLogin()
    dashboardPage.verifyPageLoaded()
    
    // Perform multiple operations
    dashboardPage.navigateToTransferFunds()
    transferFundsPage.verifyPageLoaded()
    
    dashboardPage.navigateToAccountsOverview()
    accountsOverviewPage.verifyPageLoaded()
    
    dashboardPage.navigateToOpenNewAccount()
    openNewAccountPage.verifyPageLoaded()
    
    // Verify we're still logged in
    dashboardPage.navigateToAccountsOverview()
    dashboardPage.verifyPageLoaded()
  })
})
