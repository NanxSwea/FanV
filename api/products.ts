import { Product } from '@/types';

// Mock product data
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Organic Turmeric Root Powder',
    description: 'Premium organic turmeric powder sourced from sustainable farms. Rich in curcumin with anti-inflammatory and antioxidant properties. Perfect for cooking or health supplements.',
    price: 12.99,
    category: 'Herbs',
    image: 'https://images.pexels.com/photos/4113834/pexels-photo-4113834.jpeg',
    stock: 50,
    vendorId: 1,
  },
  {
    id: 2,
    name: 'Echinacea Immune Support',
    description: 'Natural herbal supplement to boost immune function. Contains organically grown echinacea known for its immune-supporting properties.',
    price: 19.99,
    category: 'Supplements',
    image: 'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg',
    stock: 30,
    vendorId: 1,
  },
  {
    id: 3,
    name: 'Lavender Essential Oil',
    description: 'Pure distilled lavender oil for aromatherapy and relaxation. Sourced from high-altitude lavender fields for optimal potency.',
    price: 18.50,
    category: 'Oils',
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
    stock: 45,
    vendorId: 2,
  },
  {
    id: 4,
    name: 'Chamomile Relaxation Tea',
    description: 'Soothing blend of organic chamomile flowers for better sleep and relaxation. Each bag contains 20 tea sachets made with biodegradable materials.',
    price: 14.99,
    category: 'Teas',
    image: 'https://images.pexels.com/photos/227908/pexels-photo-227908.jpeg',
    stock: 60,
    vendorId: 2,
  },
  {
    id: 5,
    name: 'Spirulina Superfood Powder',
    description: 'Nutrient-dense blue-green algae powder packed with protein, vitamins, and minerals. Sustainably harvested and cold-processed to preserve nutrients.',
    price: 24.99,
    category: 'Powders',
    image: 'https://images.pexels.com/photos/3008/drinks-food-people-women.jpg',
    stock: 25,
    vendorId: 1,
  },
  {
    id: 6,
    name: 'Ashwagandha Stress Relief',
    description: 'Traditional adaptogenic herb to help manage stress and support overall wellbeing. Each bottle contains 60 vegan capsules.',
    price: 21.95,
    category: 'Supplements',
    image: 'https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg',
    stock: 40,
    vendorId: 3,
  },
  {
    id: 7,
    name: 'Peppermint Digestive Support',
    description: 'Organic peppermint capsules to support healthy digestion and relieve occasional digestive discomfort. Made with pure peppermint oil.',
    price: 16.99,
    category: 'Supplements',
    image: 'https://images.pexels.com/photos/3683065/pexels-photo-3683065.jpeg',
    stock: 35,
    vendorId: 3,
  },
  {
    id: 8,
    name: 'Ginger Root Extract',
    description: 'Concentrated ginger extract for digestive health and immune support. Made from organic ginger roots with standardized bioactive compounds.',
    price: 22.50,
    category: 'Herbs',
    image: 'https://images.pexels.com/photos/1109087/pexels-photo-1109087.jpeg',
    stock: 20,
    vendorId: 1,
  }
];

// Simulate API calls
export async function getProducts(): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return [...mockProducts];
}

export async function getProductById(id: string): Promise<Product> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const product = mockProducts.find(p => p.id.toString() === id);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return { ...product };
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return mockProducts
    .filter(p => p.category.toLowerCase() === category.toLowerCase())
    .map(p => ({ ...p }));
}

export async function searchProducts(query: string): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const searchTerm = query.toLowerCase();
  
  return mockProducts
    .filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    )
    .map(p => ({ ...p }));
}