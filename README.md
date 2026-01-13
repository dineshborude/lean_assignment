# Sauce Labs Demo - Automated Test Suite

## Overview
Automated test suite for the Sauce Labs demo website (https://www.saucedemo.com) using Playwright with TypeScript.

## Features
- Page Object Model (POM) design pattern
- Complete checkout flow automation
- Random item selection (3 items)
- Comprehensive assertions
- Multiple reporting formats (HTML, JSON, JUnit)
- Screenshot and video capture on failure
- Trace recording for debugging

## Project Structure
```
├── pages/
│   ├── LoginPage.ts          # Login page objects and methods
│   ├── InventoryPage.ts      # Inventory page objects and methods
│   ├── CartPage.ts           # Cart page objects and methods
│   └── CheckoutPage.ts       # Checkout page objects and methods
├── tests/
│   └── checkout.spec.ts      # Test specifications
├── utils/
│   └── testConfig.ts         # Test data configuration
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies
└── tsconfig.json             # TypeScript configuration
├── .env.example              # Structural .env file
├── .env.example              # .env file
```
## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. **REQUIRED: Create environment file with your credentials:**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your actual credentials
   # Required variables:
   #   TEST_USERNAME
   #   TEST_PASSWORD
   #   CHECKOUT_FIRST_NAME
   #   CHECKOUT_LAST_NAME
   #   CHECKOUT_POSTAL_CODE
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests (headless mode)
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run tests with custom credentials
```bash
TEST_USERNAME=your_user TEST_PASSWORD=your_pass npm test
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### View test report
```bash
npm run test:report
```

## Test Scenarios

### Checkout Flow Test
The test suite covers the following steps:

1. **Login**: Authenticate with standard_user credentials
2. **Select Items**: Randomly select 3 items from the inventory
3. **Add to Cart**: Add selected items to shopping cart
4. **Verify Cart**: Confirm all 3 items are in the cart
5. **Checkout Information**: Fill in customer details (name, postal code)
6. **Review Order**: Verify order summary (items, prices, tax, total)
7. **Complete Purchase**: Finalize the checkout process
8. **Confirmation**: Verify successful order completion message

## Assertions Included

- Page URL verification at each step
- Item count validation in cart badge
- Cart contents verification (correct items and quantities)
- Checkout form field validation
- Order summary verification (subtotal, tax, total)
- Successful completion message validation

## Reporting

The test suite generates multiple report formats:

1. **HTML Report**: Interactive report with screenshots and videos
   - Location: `playwright-report/index.html`
   - View with: `npm run test:report`

2. **JSON Report**: Machine-readable test results
   - Location: `test-results/results.json`

3. **JUnit XML**: CI/CD integration format
   - Location: `test-results/junit.xml`

4. **Console Output**: Real-time test execution logs

## CI/CD Integration

The test suite is configured for CI/CD environments:
- Automatic retries on failure (2 retries in CI)
- Screenshot capture on failure
- Video recording on failure
- Trace recording for debugging
- JUnit XML for Jenkins/TeamCity integration

## Configuration

Key configurations in `playwright.config.ts`:
- Base URL: https://www.saucedemo.com
- Browser: Chromium (Chrome)
- Parallel execution enabled
- Automatic retry on failure
- Screenshot/video capture on failure

### Environment Variables

The test suite **requires** the following environment variables to be set:

**Authentication:**
- `TEST_USERNAME`: Login username for the application
- `TEST_PASSWORD`: Login password for the application

**Checkout Information:**
- `CHECKOUT_FIRST_NAME`: First name for checkout form
- `CHECKOUT_LAST_NAME`: Last name for checkout form
- `CHECKOUT_POSTAL_CODE`: Postal code for checkout form

**Setting Environment Variables:**

**Option 1: Using .env file (Recommended)**
```bash
# 1. Copy the template
cp .env.example .env

# 2. Edit .env and add your values
# TEST_USERNAME=your_username
# TEST_PASSWORD=your_password
# etc.
```

**Option 2: Inline with command**
```bash
TEST_USERNAME=myuser TEST_PASSWORD=mypass npm test
```

**Option 3: Export in terminal**
```bash
export TEST_USERNAME=myuser
export TEST_PASSWORD=mypass
npm test
```

**Security Note:** 
- Never commit the `.env` file to version control
- `.env` is already added to `.gitignore`
- Only commit `.env.example` as a template
- Tests will fail with clear error message if variables are missing

### CI/CD Environment Variables

For CI/CD pipelines (GitHub Actions, Jenkins, etc.), set environment variables in your pipeline configuration:

**GitHub Actions Example:**
```yaml
- name: Run tests
  env:
    TEST_USERNAME: ${{ secrets.TEST_USERNAME }}
    TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
    CHECKOUT_FIRST_NAME: ${{ secrets.CHECKOUT_FIRST_NAME }}
    CHECKOUT_LAST_NAME: ${{ secrets.CHECKOUT_LAST_NAME }}
    CHECKOUT_POSTAL_CODE: ${{ secrets.CHECKOUT_POSTAL_CODE }}
  run: npm test
```

**Jenkins Example:**
```groovy
environment {
    TEST_USERNAME = credentials('test-username')
    TEST_PASSWORD = credentials('test-password')
    CHECKOUT_FIRST_NAME = 'John'
    CHECKOUT_LAST_NAME = 'Doe'
    CHECKOUT_POSTAL_CODE = '12345'
}
```

## Notes

- The test randomly selects 3 items from the inventory, so each test run may select different products
- Standard user credentials: `standard_user` / `secret_sauce`
- Test execution time: ~7-10 seconds per test