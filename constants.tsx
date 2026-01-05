
import React from 'react';
import { Product, Design } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Premium Unisex T-Shirt',
    price: 29.99,
    description: '100% Ring-spun cotton. Pre-shrunk for extra durability.',
    baseImageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
    category: 'tshirt'
  },
  {
    id: 'p2',
    name: 'Heavyweight Cotton Tee',
    price: 34.99,
    description: 'Classic fit with a thicker feel. Perfect for structured looks.',
    baseImageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1000',
    category: 'tshirt'
  }
];

export const GALLERY_DESIGNS: Design[] = [
  { id: 'd1', name: 'Cyberpunk Tiger', author: 'FL Artist', imageUrl: 'https://picsum.photos/id/10/400/400' },
  { id: 'd2', name: 'Zen Garden', author: 'FL Artist', imageUrl: 'https://picsum.photos/id/11/400/400' },
  { id: 'd3', name: 'Neon Wave', author: 'FL Artist', imageUrl: 'https://picsum.photos/id/12/400/400' },
  { id: 'd4', name: 'Abstract Flow', author: 'FL Artist', imageUrl: 'https://picsum.photos/id/13/400/400' },
  { id: 'd5', name: 'Space Explorer', author: 'FL Artist', imageUrl: 'https://picsum.photos/id/14/400/400' },
  { id: 'd6', name: 'Digital Rain', author: 'FL Artist', imageUrl: 'https://picsum.photos/id/15/400/400' },
];

export const COLORS = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Grey', hex: '#808080' },
  { name: 'Red', hex: '#FF0000' }
];

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
