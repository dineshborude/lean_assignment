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
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies
└── tsconfig.json            # TypeScript configuration

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
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

## Notes

- The test randomly selects 3 items from the inventory, so each test run may select different products
- Standard user credentials: `standard_user` / `secret_sauce`
- Test execution time: ~10-15 seconds per test