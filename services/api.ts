
import { Product, User, Order, CartItem } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  async getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async syncUser(user: User): Promise<User> {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Failed to sync user');
    return res.json();
  },

  async createOrder(order: Order): Promise<void> {
    await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const res = await fetch(`${API_URL}/orders/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },

  async getAdminOrders(): Promise<Order[]> {
    const res = await fetch(`${API_URL}/admin/orders`);
    if (!res.ok) throw new Error('Failed to fetch admin orders');
    return res.json();
  },

  async getAdminUsers(): Promise<User[]> {
    const res = await fetch(`${API_URL}/admin/users`);
    if (!res.ok) throw new Error('Failed to fetch admin users');
    return res.json();
  },

  async createPaymentIntent(amount: number): Promise<{ clientSecret: string }> {
    const res = await fetch(`${API_URL}/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
    });
    if (!res.ok) throw new Error('Failed to create payment intent');
    return res.json();
  }
};
