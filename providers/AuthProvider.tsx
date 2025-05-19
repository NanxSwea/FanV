import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (e.g., from AsyncStorage)
    // This is a mock implementation
    const checkAuth = async () => {
      try {
        // Simulate checking stored credentials
        await new Promise(resolve => setTimeout(resolve, 500));
        setUser(null); // No stored user for demo purposes
      } catch (error) {
        console.error('Failed to load authentication state', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    // In a real app, we would store the user data in AsyncStorage/SecureStore
    setUser(userData);
  };

  const logout = () => {
    // In a real app, we would clear AsyncStorage/SecureStore
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);