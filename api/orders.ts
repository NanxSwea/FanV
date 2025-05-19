import { Order, OrderStatus } from '@/types';

// Mock order data
const mockOrders: Order[] = [
  {
    id: 1001,
    items: [
      {
        id: 1,
        product: {
          id: 1,
          name: 'Organic Turmeric Root Powder',
          description: 'Premium organic turmeric powder.',
          price: 12.99,
          category: 'Herbs',
          image: 'https://images.pexels.com/photos/4113834/pexels-photo-4113834.jpeg',
          stock: 50,
          vendorId: 1,
        },
        quantity: 2,
      },
      {
        id: 2,
        product: {
          id: 3,
          name: 'Lavender Essential Oil',
          description: 'Pure distilled lavender oil for aromatherapy.',
          price: 18.50,
          category: 'Oils',
          image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
          stock: 45,
          vendorId: 2,
        },
        quantity: 1,
      },
    ],
    status: 'Delivered',
    total: 44.48,
    createdAt: new Date('2025-05-10T14:30:00'),
    userId: 2,
  },
  {
    id: 1002,
    items: [
      {
        id: 3,
        product: {
          id: 5,
          name: 'Spirulina Superfood Powder',
          description: 'Nutrient-dense blue-green algae powder.',
          price: 24.99,
          category: 'Powders',
          image: 'https://images.pexels.com/photos/3008/drinks-food-people-women.jpg',
          stock: 25,
          vendorId: 1,
        },
        quantity: 1,
      },
    ],
    status: 'Shipped',
    total: 24.99,
    createdAt: new Date('2025-05-25T11:15:00'),
    userId: 2,
  },
  {
    id: 1003,
    items: [
      {
        id: 4,
        product: {
          id: 2,
          name: 'Echinacea Immune Support',
          description: 'Natural herbal supplement to boost immune function.',
          price: 19.99,
          category: 'Supplements',
          image: 'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg',
          stock: 30,
          vendorId: 1,
        },
        quantity: 3,
      },
      {
        id: 5,
        product: {
          id: 4,
          name: 'Chamomile Relaxation Tea',
          description: 'Soothing blend of organic chamomile flowers.',
          price: 14.99,
          category: 'Teas',
          image: 'https://images.pexels.com/photos/227908/pexels-photo-227908.jpeg',
          stock: 60,
          vendorId: 2,
        },
        quantity: 2,
      },
    ],
    status: 'Processing',
    total: 89.95,
    createdAt: new Date('2025-06-01T09:45:00'),
    userId: 2,
  },
];

// Simulate API calls
export async function getOrders(): Promise<Order[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return [...mockOrders];
}

export async function getOrderById(id: string): Promise<Order> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const order = mockOrders.find(o => o.id.toString() === id);
  
  if (!order) {
    throw new Error('Order not found');
  }
  
  return { ...order };
}

export async function updateOrderStatus(
  orderId: number, 
  status: OrderStatus
): Promise<Order> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const orderIndex = mockOrders.findIndex(o => o.id === orderId);
  
  if (orderIndex < 0) {
    throw new Error('Order not found');
  }
  
  const updatedOrder = {
    ...mockOrders[orderIndex],
    status,
  };
  
  // In a real app, we would update the order in the database
  // For demo purposes, we're just returning the updated order
  return { ...updatedOrder };
}