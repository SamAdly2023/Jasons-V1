
import { Product, User, Order, CartItem } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  async getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async syncUser(user: User): Promise<void> {
    await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
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
  }
};
