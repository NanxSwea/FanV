import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';

const categories = [
  'All',
  'Herbs',
  'Supplements',
  'Oils',
  'Teas',
  'Powders',
  'Wellness',
  'Bundles',
  'Gifts',
];

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.selectedFilterButton,
              category === 'All' && !selectedCategory && styles.selectedFilterButton,
            ]}
            onPress={() => onSelectCategory(category === 'All' ? null : category)}
          >
            <Text
              style={[
                styles.filterButtonText,
                (selectedCategory === category || (category === 'All' && !selectedCategory)) && 
                  styles.selectedFilterButtonText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  filterScroll: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedFilterButton: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[600],
  },
  filterButtonText: {
    fontSize: 14,
    color: Colors.text.primary,
  },
  selectedFilterButtonText: {
    color: Colors.white,
    fontWeight: '500',
  },
});