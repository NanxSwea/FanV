// Simulate Vendor Dashboard API

export async function getVendorDashboardData() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    products: {
      total: 24,
      active: 20,
      outOfStock: 4,
    },
    orders: {
      total: 46,
      pending: 12,
      completed: 34,
    },
    revenue: {
      total: 3862.50,
      thisMonth: 1248.75,
      lastMonth: 2613.75,
    },
    customers: {
      total: 85,
      newThisMonth: 12,
    },
    chartData: {
      // Pretend chart data would go here
    }
  };
}

export async function getVendorProducts() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return [
    {
      id: 1,
      name: 'Organic Turmeric Root Powder',
      price: 12.99,
      stock: 50,
      image: 'https://images.pexels.com/photos/4113834/pexels-photo-4113834.jpeg',
      sales: 32,
    },
    {
      id: 2,
      name: 'Echinacea Immune Support',
      price: 19.99,
      stock: 30,
      image: 'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg',
      sales: 28,
    },
    {
      id: 5,
      name: 'Spirulina Superfood Powder',
      price: 24.99,
      stock: 25,
      image: 'https://images.pexels.com/photos/3008/drinks-food-people-women.jpg',
      sales: 18,
    },
    {
      id: 8,
      name: 'Ginger Root Extract',
      price: 22.50,
      stock: 20,
      image: 'https://images.pexels.com/photos/1109087/pexels-photo-1109087.jpeg',
      sales: 15,
    },
    {
      id: 12,
      name: 'Elderberry Syrup',
      price: 28.99,
      stock: 18,
      image: 'https://images.pexels.com/photos/7474270/pexels-photo-7474270.jpeg',
      sales: 12,
    },
  ];
}

export async function getVendorOrders() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return [
    {
      id: '1245',
      date: '2025-06-12T14:30:00',
      customer: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
      },
      items: [
        {
          id: 1,
          productId: 1,
          name: 'Organic Turmeric Root Powder',
          price: 12.99,
          quantity: 2,
        },
        {
          id: 2,
          productId: 5,
          name: 'Spirulina Superfood Powder',
          price: 24.99,
          quantity: 1,
        },
      ],
      total: 50.97,
      status: 'Processing',
    },
    {
      id: '1244',
      date: '2025-06-11T09:15:00',
      customer: {
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
      },
      items: [
        {
          id: 3,
          productId: 8,
          name: 'Ginger Root Extract',
          price: 22.50,
          quantity: 1,
        },
      ],
      total: 22.50,
      status: 'Shipped',
    },
    {
      id: '1243',
      date: '2025-06-10T16:45:00',
      customer: {
        name: 'Sarah Williams',
        email: 'sarah.williams@example.com',
      },
      items: [
        {
          id: 4,
          productId: 2,
          name: 'Echinacea Immune Support',
          price: 19.99,
          quantity: 2,
        },
        {
          id: 5,
          productId: 12,
          name: 'Elderberry Syrup',
          price: 28.99,
          quantity: 1,
        },
      ],
      total: 68.97,
      status: 'Delivered',
    },
  ];
}

export async function getVendorOrderById(id: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  // This would fetch a specific order in a real implementation
  return {
    id,
    date: '2025-06-12T14:30:00',
    customer: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      address: {
        street: '123 Wellness Ave',
        city: 'Healthville',
        state: 'CA',
        zip: '90210',
        country: 'USA',
      },
    },
    items: [
      {
        id: 1,
        productId: 1,
        name: 'Organic Turmeric Root Powder',
        price: 12.99,
        quantity: 2,
      },
      {
        id: 2,
        productId: 5,
        name: 'Spirulina Superfood Powder',
        price: 24.99,
        quantity: 1,
      },
    ],
    subtotal: 50.97,
    shipping: 5.99,
    tax: 4.58,
    total: 61.54,
    status: 'Processing',
    notes: 'Please leave package at the door',
  };
}

export async function updateVendorOrderStatus(id: string, status: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // This would update the order status in a real implementation
  return {
    success: true,
    order: {
      id,
      status,
    },
  };
}

export async function getVendorEarnings() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));

  return {
    balance: 1248.75,
    pendingPayouts: 425.50,
    recentTransactions: [
      {
        id: 'T1001',
        date: '2025-06-01T10:20:00',
        amount: 425.50,
        type: 'payout',
        status: 'completed',
      },
      {
        id: 'T1002',
        date: '2025-05-15T14:30:00',
        amount: 312.75,
        type: 'order',
        status: 'completed',
        orderId: '1236',
      },
      {
        id: 'T1003',
        date: '2025-05-12T09:45:00',
        amount: 189.99,
        type: 'order',
        status: 'completed',
        orderId: '1235',
      },
    ],
    monthlyEarnings: {
      // Monthly earnings chart data would go here
    },
  };
}