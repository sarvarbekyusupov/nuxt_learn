import type { Product } from '~/types/product'

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'TechPro Smartwatch',
    description: 'A cutting-edge smartwatch with heart rate monitoring and GPS.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400',
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'UltraBass Headphones',
    description: 'Noise-canceling over-ear headphones with deep bass and long battery life.',
    price: 249.50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400',
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'ZenFocus Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple color temperatures and brightness levels.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=400',
    category: 'Home'
  },
  {
    id: 4,
    name: 'AeroGlide Backpack',
    description: 'Lightweight and durable backpack perfect for daily commute or weekend trips.',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&q=80&w=400',
    category: 'Lifestyle'
  }
]
