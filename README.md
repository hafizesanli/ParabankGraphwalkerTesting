# ParaBank Cypress Test Automation


## Features

- **GraphWalker Concepts**: Maintains the original GraphWalker model structure with vertices and edges
- **Page Object Model**: Clean, maintainable page objects for each ParaBank page
- **Random Path Generation**: Implements GraphWalker's random edge coverage approach
- **Comprehensive Coverage**: Tests all major ParaBank functionalities
- **Modern Testing**: Uses Cypress's built-in features for better reliability and debugging

## Project Structure

```
cypress/
├── e2e/                          # Test files
│   ├── parabank-graphwalker.cy.js      # Main GraphWalker tests
│   ├── parabank-random-path.cy.js       # Random path generation tests
│   └── parabank-complete-suite.cy.js   # Comprehensive test suite
├── fixtures/                     # Test data
│   ├── testData.json            # Test data configuration
│   └── graphwalkerModel.json   # GraphWalker model definition
├── support/                      # Support files
│   ├── commands.js              # Custom Cypress commands
│   ├── e2e.js                   # Main support file
│   ├── testRunner.js            # Test runner utilities
│   └── pages/                   # Page Object Model
│       ├── LoginPage.js
│       ├── DashboardPage.js
│       ├── TransferFundsPage.js
│       ├── OpenNewAccountPage.js
│       ├── UpdateProfilePage.js
│       ├── AccountsOverviewPage.js
│       └── BillPayPage.js
├── downloads/                    # Downloaded files
├── screenshots/                  # Test screenshots
├── videos/                       # Test recordings
└── reports/                      # Test reports
```

##️ Installation

1. **Install Node.js** (version 14 or higher)

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Install Cypress** (if not already installed):
   ```bash
   npx cypress install
   ```

## Test Coverage

### GraphWalker Vertices Covered

- `v_LoginPage` - Login page verification
- `v_EnteredInvalidCredentials` - Invalid credentials state
- `v_LoginError` - Login error state
- `v_EnteredValidCredentials` - Valid credentials state
- `v_Dashboard` - Dashboard page verification
- `v_TransferComplete` - Transfer completion state
- `v_TransferFunds` - Transfer funds page
- `v_ValidationError` - Validation error state
- `v_EnteredInvalidAmount` - Invalid amount state
- `v_EnteredValidAmount` - Valid amount state
- `v_OpenAccount` - Open account page
- `v_AccountOpened` - Account opened state
- `v_AccountSelected` - Account selected state
- `v_SelectedType` - Account type selected state
- `v_UpdateProfile` - Update profile page
- `v_ProfileUpdated` - Profile updated state
- `v_AccountsOverview` - Accounts overview page
- `v_AccountDetails` - Account details page
- `v_TransactionDetails` - Transaction details page
- `v_BillPayForm_Empty` - Empty bill pay form
- `v_BillPayForm_ValidationErrors` - Bill pay validation errors
- `v_BillPayForm_PartiallyFilled` - Partially filled form
- `v_BillPayForm_AllFilled` - All fields filled
- `v_BillPayForm_InvalidData` - Invalid data state
- `v_BillPayForm_Valid` - Valid data state
- `v_BillPaymentComplete` - Bill payment complete

### GraphWalker Edges Covered

- `e_StartBrowser` - Navigate to application
- `e_EnterInvalidCredentials` - Enter invalid login credentials
- `e_EnterValidCredentials` - Enter valid login credentials
- `e_ClickLoginButton` - Click login button
- `e_ClickLogoutButton` - Click logout button
- `e_RetryLogin` - Retry login after error
- `e_ClickTransferFundsButton` - Navigate to transfer funds
- `e_ReturnToDashboard` - Return to dashboard
- `e_ClickTransferButton` - Execute transfer
- `e_EnterInvalidAmount` - Enter invalid transfer amount
- `e_EnterValidAmount` - Enter valid transfer amount
- `e_ClickOpenNewAccount` - Navigate to open new account
- `e_SelectType` - Select account type
- `e_SelectAccount` - Select account
- `e_OpenNewAccount` - Open new account
- `e_ClickAccountsOverview` - Navigate to accounts overview
- `e_ClickTransaction` - Click on transaction
- `e_ClickAccountNumber` - Click on account number
- `e_ClickUpdateContactInfo` - Navigate to update contact info
- `e_ClickUpdateProfileButton` - Update profile
- `e_ChangeName` - Change first name
- `e_ChangeLastName` - Change last name
- `e_ChangeAdress` - Change address
- `e_ChangeCity` - Change city
- `e_ChangeState` - Change state
- `e_ChangeZipCode` - Change zip code
- `e_ChangePhone` - Change phone
- `e_ClickBillPay` - Navigate to bill pay
- `e_ClickSendEmpty` - Send empty bill pay form
- `e_FillPayeeName` - Fill payee name
- `e_FillAddress` - Fill address
- `e_FillAllRemainingFields` - Fill all remaining fields
- `e_CorrectErrors` - Correct validation errors
- `e_ClickSendValid` - Send valid payment
- `e_ClickSendInvalid` - Send invalid payment
- `e_CorrectInvalidData` - Correct invalid data

## Running Tests

### Open Cypress Test Runner

```bash
npm run cypress:open
```

### Run Tests in Headless Mode

```bash
npm run cypress:run
```

### Run Tests in Specific Browser

```bash
npm run cypress:run:chrome
npm run cypress:run:firefox
npm run cypress:run:edge
```

### Run Tests with Headed Mode

```bash
npm run test:headed
```

## Test Types

### 1. Individual Vertex Tests

Tests each GraphWalker vertex individually to ensure proper state verification.

### 2. Edge Execution Tests

Tests each GraphWalker edge to ensure proper action execution.

### 3. Random Path Tests

Implements GraphWalker's random path generation with edge coverage analysis.

### 4. Comprehensive Workflow Tests

Tests complete user workflows combining multiple vertices and edges.

### 5. Error Handling Tests

Tests error scenarios and recovery mechanisms.

## Configuration

### Environment Variables

The project uses Cypress environment variables for test data:

```javascript
env: {
  VALID_USERNAME: "a",
  VALID_PASSWORD: "a",
  INVALID_USERNAME: "wronguser",
  INVALID_PASSWORD: "invalidpass",
  // ... more test data
}
```

### Test Configuration

```javascript
{
  baseUrl: "https://parabank.parasoft.com/parabank/",
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  // ... more configuration
}
```

## GraphWalker Implementation

### Random Path Generation

The project implements GraphWalker's random path generation algorithm:

1. **State Management**: Tracks current application state
2. **Edge Selection**: Randomly selects available edges
3. **Coverage Tracking**: Monitors edge coverage for comprehensive testing
4. **Path Execution**: Executes selected edges and transitions states

### Edge Coverage Analysis

- Tracks visited edges across test runs
- Calculates coverage percentage
- Identifies uncovered edges for additional testing

## Page Object Model

Each page has its own Page Object class with:

- **Element Selectors**: Centralized element identification
- **Actions**: Methods for user interactions
- **Verifications**: Methods for state validation
- **Fluent Interface**: Chainable methods for readable tests

## Custom Commands

The project includes custom Cypress commands for:

- `visitParabank()` - Navigate to ParaBank
- `login(username, password)` - Login with credentials
- `logout()` - Logout from application
- `waitForElement(selector)` - Wait for element visibility
- `randomSelect(selector)` - Random selection from options
- `verifyElementExists(selector)` - Verify element existence
- `verifyTextContent(selector, text)` - Verify text content

## Debugging

### Screenshots and Videos

- Screenshots are automatically captured on test failures
- Videos are recorded for all test runs
- Files are stored in `cypress/screenshots/` and `cypress/videos/`

### Console Logging

- Detailed logging for each GraphWalker vertex and edge
- Coverage reports with edge statistics
- Test execution paths for debugging

## Reporting

The project uses `cypress-mochawesome-reporter` for comprehensive test reporting:

- HTML reports with detailed test results
- JSON reports for CI/CD integration
- Coverage analysis and statistics