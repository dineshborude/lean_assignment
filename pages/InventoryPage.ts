import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addRandomItemsToCart(count: number): Promise<string[]> {
    const totalItems = await this.getItemCount();
    const addedItems: string[] = [];
    const randomIndices = this.getRandomIndices(totalItems, count);

    for (const index of randomIndices) {
      const item = this.inventoryItems.nth(index);
      const itemName = await item.locator('.inventory_item_name').textContent();
      const addButton = item.locator('[data-test^="add-to-cart"]');
      
      await addButton.click();
      if (itemName) addedItems.push(itemName);
    }

    return addedItems;
  }

  private getRandomIndices(max: number, count: number): number[] {
    const indices = new Set<number>();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * max));
    }
    return Array.from(indices);
  }

  async getCartItemCount(): Promise<number> {
    const badgeText = await this.shoppingCartBadge.textContent();
    return badgeText ? parseInt(badgeText) : 0;
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }
}
