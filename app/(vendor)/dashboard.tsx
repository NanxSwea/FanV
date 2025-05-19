import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { Package, ShoppingBag, DollarSign, Users, Settings, ChartBar as BarChart2, Plus, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { VendorProductCard } from '@/components/VendorProductCard';
import { VendorNavbar } from '@/components/VendorNavbar';
import { getVendorDashboardData } from '@/api/vendor';

const { width } = Dimensions.get('window');

export default function VendorDashboardScreen() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await getVendorDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const navigateToProducts = () => {
    router.push('/(vendor)/products');
  };

  const navigateToOrders = () => {
    router.push('/(vendor)/orders');
  };

  const navigateToWallet = () => {
    router.push('/(vendor)/wallet');
  };

  const navigateToAddProduct = () => {
    router.push({
      pathname: '/(vendor)/products/edit',
      params: { new: 'true' },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary[600]} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.vendorName}>Green Essentials</Text>
        </View>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => router.push('/(vendor)/profile')}
        >
          <Settings size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          <TouchableOpacity 
            style={styles.statsCard}
            onPress={navigateToProducts}
          >
            <View style={[styles.statsIconContainer, styles.productsIcon]}>
              <ShoppingBag size={24} color={Colors.primary[600]} />
            </View>
            <Text style={styles.statsValue}>24</Text>
            <Text style={styles.statsLabel}>Products</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statsCard}
            onPress={navigateToOrders}
          >
            <View style={[styles.statsIconContainer, styles.ordersIcon]}>
              <Package size={24} color={Colors.info[600]} />
            </View>
            <Text style={styles.statsValue}>12</Text>
            <Text style={styles.statsLabel}>Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statsCard}
            onPress={navigateToWallet}
          >
            <View style={[styles.statsIconContainer, styles.revenueIcon]}>
              <DollarSign size={24} color={Colors.success[600]} />
            </View>
            <Text style={styles.statsValue}>$1,248</Text>
            <Text style={styles.statsLabel}>Revenue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statsCard}>
            <View style={[styles.statsIconContainer, styles.customersIcon]}>
              <Users size={24} color={Colors.warning[600]} />
            </View>
            <Text style={styles.statsValue}>85</Text>
            <Text style={styles.statsLabel}>Customers</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.salesChartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Sales Overview</Text>
            <BarChart2 size={20} color={Colors.primary[600]} />
          </View>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>Sales chart visualization</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Products</Text>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={navigateToProducts}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={Colors.primary[600]} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsContainer}
        >
          <TouchableOpacity 
            style={styles.addProductCard}
            onPress={navigateToAddProduct}
          >
            <View style={styles.addProductIcon}>
              <Plus size={32} color={Colors.primary[600]} />
            </View>
            <Text style={styles.addProductText}>Add New Product</Text>
          </TouchableOpacity>

          <VendorProductCard
            product={{
              id: 1,
              name: 'Organic Turmeric Root',
              price: 12.99,
              stock: 25,
              image: 'https://images.pexels.com/photos/4113834/pexels-photo-4113834.jpeg',
              sales: 18,
            }}
          />

          <VendorProductCard
            product={{
              id: 2,
              name: 'Lavender Essential Oil',
              price: 18.50,
              stock: 15,
              image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
              sales: 12,
            }}
          />

          <VendorProductCard
            product={{
              id: 3,
              name: 'Echinacea Supplement',
              price: 24.99,
              stock: 8,
              image: 'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg',
              sales: 5,
            }}
          />
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={navigateToOrders}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={Colors.primary[600]} />
          </TouchableOpacity>
        </View>

        <View style={styles.ordersContainer}>
          <View style={styles.orderItem}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderNumber}>#1245</Text>
              <Text style={styles.orderDate}>Jun 12, 2025</Text>
            </View>
            <View style={styles.orderMiddle}>
              <Text style={styles.orderCustomer}>Jane Smith</Text>
              <Text style={styles.orderItemsCount}>2 items</Text>
            </View>
            <View style={styles.orderRight}>
              <Text style={styles.orderPrice}>$42.50</Text>
              <View style={[styles.orderStatusBadge, styles.statusProcessing]}>
                <Text style={styles.orderStatusText}>Processing</Text>
              </View>
            </View>
          </View>

          <View style={styles.orderItem}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderNumber}>#1244</Text>
              <Text style={styles.orderDate}>Jun 11, 2025</Text>
            </View>
            <View style={styles.orderMiddle}>
              <Text style={styles.orderCustomer}>Mike Johnson</Text>
              <Text style={styles.orderItemsCount}>1 item</Text>
            </View>
            <View style={styles.orderRight}>
              <Text style={styles.orderPrice}>$18.99</Text>
              <View style={[styles.orderStatusBadge, styles.statusShipped]}>
                <Text style={styles.orderStatusText}>Shipped</Text>
              </View>
            </View>
          </View>

          <View style={styles.orderItem}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderNumber}>#1243</Text>
              <Text style={styles.orderDate}>Jun 10, 2025</Text>
            </View>
            <View style={styles.orderMiddle}>
              <Text style={styles.orderCustomer}>Sarah Williams</Text>
              <Text style={styles.orderItemsCount}>3 items</Text>
            </View>
            <View style={styles.orderRight}>
              <Text style={styles.orderPrice}>$64.97</Text>
              <View style={[styles.orderStatusBadge, styles.statusDelivered]}>
                <Text style={styles.orderStatusText}>Delivered</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <VendorNavbar active="dashboard" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error[500],
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: Colors.primary[600],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  vendorName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary[700],
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  statsCard: {
    width: (width - 48) / 2,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    margin: 4,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statsIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  productsIcon: {
    backgroundColor: Colors.primary[50],
  },
  ordersIcon: {
    backgroundColor: Colors.info[50],
  },
  revenueIcon: {
    backgroundColor: Colors.success[50],
  },
  customersIcon: {
    backgroundColor: Colors.warning[50],
  },
  statsValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  salesChartContainer: {
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  chartPlaceholder: {
    height: 180,
    backgroundColor: Colors.background,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholderText: {
    color: Colors.text.secondary,
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary[600],
    marginRight: 4,
  },
  productsContainer: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  addProductCard: {
    width: 180,
    height: 240,
    backgroundColor: Colors.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: Colors.primary[100],
    borderStyle: 'dashed',
  },
  addProductIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  addProductText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary[600],
  },
  ordersContainer: {
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  orderInfo: {
    flex: 2,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  orderMiddle: {
    flex: 3,
    paddingHorizontal: 8,
  },
  orderCustomer: {
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  orderItemsCount: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  orderRight: {
    flex: 2,
    alignItems: 'flex-end',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary[700],
    marginBottom: 4,
  },
  orderStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusProcessing: {
    backgroundColor: Colors.warning[100],
  },
  statusShipped: {
    backgroundColor: Colors.info[100],
  },
  statusDelivered: {
    backgroundColor: Colors.success[100],
  },
  orderStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
});