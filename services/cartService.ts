import { MenuItem } from './menuService';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export function calculateItemTotal(cartItem: CartItem): number {
  return cartItem.item.price * cartItem.quantity;
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, cartItem) => sum + calculateItemTotal(cartItem), 0);
}

export function calculateTax(subtotal: number, taxRate: number = 0.05): number {
  return Math.round(subtotal * taxRate);
}

export function calculateTotal(subtotal: number, tax: number): number {
  return subtotal + tax;
}

export function formatPrice(price: number): string {
  return `Rs. ${price}`;
}
