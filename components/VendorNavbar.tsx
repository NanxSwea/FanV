import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  DollarSign, 
  User
} from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface VendorNavbarProps {
  active: 'dashboard' | 'products' | 'orders' | 'wallet' | 'profile';
}

export function VendorNavbar({ active }: VendorNavbarProps) {
  const navigate = (route: string) => {
    router.push(`/(vendor)/${route}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigate('dashboard')}
      >
        <LayoutDashboard 
          size={24} 
          color={active === 'dashboard' ? Colors.primary[600] : Colors.text.secondary} 
        />
        <Text 
          style={[
            styles.navLabel,
            active === 'dashboard' && styles.activeNavLabel
          ]}
        >
          Dashboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigate('products')}
      >
        <ShoppingBag 
          size={24} 
          color={active === 'products' ? Colors.primary[600] : Colors.text.secondary} 
        />
        <Text 
          style={[
            styles.navLabel,
            active === 'products' && styles.activeNavLabel
          ]}
        >
          Products
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigate('orders')}
      >
        <Package 
          size={24} 
          color={active === 'orders' ? Colors.primary[600] : Colors.text.secondary} 
        />
        <Text 
          style={[
            styles.navLabel,
            active === 'orders' && styles.activeNavLabel
          ]}
        >
          Orders
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigate('wallet')}
      >
        <DollarSign 
          size={24} 
          color={active === 'wallet' ? Colors.primary[600] : Colors.text.secondary} 
        />
        <Text 
          style={[
            styles.navLabel,
            active === 'wallet' && styles.activeNavLabel
          ]}
        >
          Wallet
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigate('profile')}
      >
        <User 
          size={24} 
          color={active === 'profile' ? Colors.primary[600] : Colors.text.secondary} 
        />
        <Text 
          style={[
            styles.navLabel,
            active === 'profile' && styles.activeNavLabel
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  activeNavLabel: {
    color: Colors.primary[600],
    fontWeight: '500',
  },
});