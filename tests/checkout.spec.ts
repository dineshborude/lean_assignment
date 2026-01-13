import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { getTestCredentials, getCheckoutInfo } from '../utils/testConfig';

test.describe('Sauce Demo - Checkout Flow', () => {
  test('Complete checkout flow with 3 random items', async ({ page }) => {
    // Initialize page objects
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Get credentials from environment variables
    const { username, password } = getTestCredentials();

    // Step 1: Navigate to login page
    await test.step('Navigate to Sauce Demo website', async () => {
      await loginPage.goto();
      await expect(page).toHaveTitle(/Swag Labs/);
    });

    // Step 2: Login with valid credentials
    await test.step('Login with standard user', async () => {
      await loginPage.login(username, password);
      await expect(page).toHaveURL(/.*inventory.html/);
    });

    // Step 3: Add 3 random items to cart
    let addedItems: string[];
    await test.step('Add 3 random items to cart', async () => {
      addedItems = await inventoryPage.addRandomItemsToCart(3);
      
      // Verify 3 items were added
      expect(addedItems).toHaveLength(3);
      
      // Verify cart badge shows 3 items
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(3);
      
      console.log('Added items:', addedItems);
    });

    // Step 4: Navigate to cart
    await test.step('Navigate to shopping cart', async () => {
      await inventoryPage.goToCart();
      await expect(page).toHaveURL(/.*cart.html/);
    });

    // Step 5: Verify cart contents
    await test.step('Verify cart contains correct items', async () => {
      const cartItemCount = await cartPage.getCartItemCount();
      expect(cartItemCount).toBe(3);
      
      const cartItemNames = await cartPage.getCartItemsNames();
      expect(cartItemNames).toHaveLength(3);
      
      // Verify all added items are in the cart
      addedItems.forEach(item => {
        expect(cartItemNames).toContain(item);
      });
    });

    // Step 6: Proceed to checkout
    await test.step('Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
      await expect(page).toHaveURL(/.*checkout-step-one.html/);
    });

    // Step 7: Fill checkout information
    await test.step('Fill checkout information', async () => {
      const { firstName, lastName, postalCode } = getCheckoutInfo();
      
      await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
      await checkoutPage.continueToOverview();
      await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });

    // Step 8: Verify checkout overview
    await test.step('Verify checkout overview', async () => {
      // Verify subtotal exists
      await expect(checkoutPage.subtotalLabel).toBeVisible();
      
      // Verify tax exists
      await expect(checkoutPage.taxLabel).toBeVisible();
      
      // Verify total exists
      await expect(checkoutPage.totalLabel).toBeVisible();
      
      const total = await checkoutPage.getOrderTotal();
      expect(total).toContain('Total:');
    });

    // Step 9: Complete checkout
    await test.step('Complete the checkout', async () => {
      await checkoutPage.finishCheckout();
      await expect(page).toHaveURL(/.*checkout-complete.html/);
    });

    // Step 10: Verify order completion
    await test.step('Verify successful order completion', async () => {
      const completionMessage = await checkoutPage.getCompletionMessage();
      expect(completionMessage).toContain('Thank you for your order');
      
      await expect(checkoutPage.completeText).toBeVisible();
    });
  });

   test('Complete checkout flow with 3 random items - Multiple runs', async ({ page }) => {
    // This test demonstrates multiple executions with different random items
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Get credentials and checkout info from environment
    const { username, password } = getTestCredentials();
    const { firstName, lastName, postalCode } = getCheckoutInfo();

    await loginPage.goto();
    await loginPage.login(username, password);
    
    const addedItems = await inventoryPage.addRandomItemsToCart(3);
    expect(addedItems).toHaveLength(3);
    
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
    await checkoutPage.continueToOverview();
    await checkoutPage.finishCheckout();
    
    const completionMessage = await checkoutPage.getCompletionMessage();
    expect(completionMessage).toContain('Thank you for your order');
  });
});
