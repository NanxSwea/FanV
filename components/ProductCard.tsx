import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  horizontal?: boolean;
}

export function ProductCard({ product, horizontal = false }: ProductCardProps) {
  const navigateToProduct = () => {
    router.push(`/(tabs)/home/product/${product.id}`);
  };

  if (horizontal) {
    return (
      <TouchableOpacity 
        style={styles.horizontalContainer}
        onPress={navigateToProduct}
      >
        <Image
          source={{ uri: product.image }}
          style={styles.horizontalImage}
          resizeMode="cover"
        />
        <View style={styles.horizontalContent}>
          <Text style={styles.horizontalCategory}>{product.category}</Text>
          <Text style={styles.horizontalName}>{product.name}</Text>
          
          <View style={styles.horizontalRatingContainer}>
            <Star size={16} color={Colors.warning[500]} fill={Colors.warning[500]} />
            <Text style={styles.horizontalRating}>4.8</Text>
            <Text style={styles.horizontalReviews}>(120)</Text>
          </View>
          
          <Text style={styles.horizontalPrice}>${product.price.toFixed(2)}</Text>
          
          <View style={styles.horizontalStockContainer}>
            <Text style={
              product.stock > 0 
                ? styles.horizontalInStock 
                : styles.horizontalOutOfStock
            }>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={navigateToProduct}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
        {product.stock <= 0 && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color={Colors.warning[500]} fill={Colors.warning[500]} />
          <Text style={styles.rating}>4.8</Text>
        </View>
        
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 180,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginRight: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  outOfStockText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    padding: 12,
  },
  category: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary[600],
  },
  
  // Horizontal card styles
  horizontalContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  horizontalImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  horizontalContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  horizontalCategory: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  horizontalName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  horizontalRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  horizontalRating: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text.primary,
    marginLeft: 4,
  },
  horizontalReviews: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 2,
  },
  horizontalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary[600],
    marginBottom: 8,
  },
  horizontalStockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalInStock: {
    fontSize: 12,
    color: Colors.success[600],
    fontWeight: '500',
  },
  horizontalOutOfStock: {
    fontSize: 12,
    color: Colors.error[500],
    fontWeight: '500',
  },
});