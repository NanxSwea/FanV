import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

const categories = [
  {
    id: 1,
    name: 'Herbs',
    icon: 'https://images.pexels.com/photos/602085/pexels-photo-602085.jpeg',
  },
  {
    id: 2,
    name: 'Supplements',
    icon: 'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg',
  },
  {
    id: 3,
    name: 'Oils',
    icon: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
  },
  {
    id: 4,
    name: 'Teas',
    icon: 'https://images.pexels.com/photos/227908/pexels-photo-227908.jpeg',
  },
  {
    id: 5,
    name: 'Powders',
    icon: 'https://images.pexels.com/photos/4113834/pexels-photo-4113834.jpeg',
  },
  {
    id: 6,
    name: 'Wellness',
    icon: 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg',
  },
];

export default function CategoryScroll() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const handleCategoryPress = (categoryId: number, categoryName: string) => {
    setActiveCategory(categoryId === activeCategory ? null : categoryId);
    
    // Navigate to search with category filter
    router.push({
      pathname: '/(tabs)/search',
      params: { category: categoryName }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton
            ]}
            onPress={() => handleCategoryPress(category.id, category.name)}
          >
            <View style={styles.iconContainer}>
              <Image
                source={{ uri: category.icon }}
                style={styles.categoryIcon}
              />
            </View>
            <Text
              style={[
                styles.categoryName,
                activeCategory === category.id && styles.activeCategoryName
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingBottom: 8,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  activeCategoryButton: {
    // No style changes needed for the container
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  categoryIcon: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  activeCategoryName: {
    color: Colors.primary[600],
    fontWeight: '600',
  },
});