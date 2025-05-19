import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { CreditCard as Edit } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface VendorProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
    sales: number;
  };
}

export function VendorProductCard({ product }: VendorProductProps) {
  const handleEditProduct = () => {
    router.push({
      pathname: '/(vendor)/products/edit',
      params: { id: product.id.toString() }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEditProduct}
        >
          <Edit size={16} color={Colors.white} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${product.price.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Price</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{product.stock}</Text>
            <Text style={styles.statLabel}>Stock</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{product.sales}</Text>
            <Text style={styles.statLabel}>Sales</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 180,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 4,
    overflow: 'hidden',
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    height: 120,
    width: '100%',
    position: 'relative',
  },
  productImage: {
    height: '100%',
    width: '100%',
  },
  editButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary[700],
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
  },
});