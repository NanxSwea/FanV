import { CartItem, Product } from '@/types';

// Mock cart data
let cartItems: CartItem[] = [
  {
    id: 1,
    product: {
      id: 1,
      name: 'Organic Turmeric Root Powder',
      description: 'Premium organic turmeric powder sourced from sustainable farms. Rich in curcumin with anti-inflammatory and antioxidant properties.',
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
      description: 'Pure distilled lavender oil for aromatherapy and relaxation. Sourced from high-altitude lavender fields for optimal potency.',
      price: 18.50,
      category: 'Oils',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
      stock: 45,
      vendorId: 2,
    },
    quantity: 1,
  },
];

// Simulate API calls
export async function getCart(): Promise<CartItem[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...cartItems];
}

export async function addToCart(productId: number, quantity: number): Promise<CartItem> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if product already in cart
  const existingItemIndex = cartItems.findIndex(
    item => item.product.id === productId
  );
  
  if (existingItemIndex >= 0) {
    // Update quantity if product already in cart
    const updatedItem = {
      ...cartItems[existingItemIndex],
      quantity: cartItems[existingItemIndex].quantity + quantity,
    };
    
    cartItems[existingItemIndex] = updatedItem;
    return { ...updatedItem };
  } else {
    // Add new item to cart
    // In a real app, we would fetch the product details from an API
    import('./products').then(({ getProductById }) => {
      getProductById(productId.toString()).then(product => {
        const newItem: CartItem = {
          id: Date.now(),
          product,
          quantity,
        };
        
        cartItems.push(newItem);
        return { ...newItem };
      });
    });
    
    // For demo purposes, return a mock item
    return {
      id: Date.now(),
      product: {
        id: productId,
        name: 'Added Product',
        description: 'Product description',
        price: 19.99,
        category: 'Supplements',
        image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
        stock: 20,
        vendorId: 1,
      },
      quantity,
    };
  }
}

export async function updateCartItem(itemId: number, quantity: number): Promise<CartItem> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const itemIndex = cartItems.findIndex(item => item.id === itemId);
  
  if (itemIndex < 0) {
    throw new Error('Cart item not found');
  }
  
  const updatedItem = {
    ...cartItems[itemIndex],
    quantity,
  };
  
  cartItems[itemIndex] = updatedItem;
  return { ...updatedItem };
}

export async function removeCartItem(itemId: number): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  cartItems = cartItems.filter(item => item.id !== itemId);
}

export async function clearCart(): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  cartItems = [];
}

export async function createOrder(items: CartItem[], total: number): Promise<number> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Clear the cart after order is created
  await clearCart();
  
  // Return a mock order ID
  return Math.floor(1000 + Math.random() * 9000);
}