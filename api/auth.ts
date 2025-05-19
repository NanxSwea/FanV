import { User } from '@/types';

// Simulated authentication functions

export async function login(email: string, password: string): Promise<User> {
  // In a real app, this would make an API request to authenticate
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, always return a success with mock data
  if (email.includes('vendor')) {
    return {
      id: 1,
      name: 'Vendor User',
      email,
      role: 'vendor',
    };
  }
  
  return {
    id: 2,
    name: 'Customer User',
    email,
    role: 'customer',
  };
}

export async function register(
  name: string, 
  email: string, 
  password: string, 
  role: 'customer' | 'vendor'
): Promise<User> {
  // In a real app, this would make an API request to register
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes, always return a success with mock data
  return {
    id: Math.floor(Math.random() * 1000),
    name,
    email,
    role,
  };
}

export async function logout(): Promise<void> {
  // In a real app, this would make an API request to logout
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
}