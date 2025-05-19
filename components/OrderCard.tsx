import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, Truck, PackageCheck } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Order } from '@/types';

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

export function OrderCard({ order, onPress }: OrderCardProps) {
  const getStatusIcon = () => {
    switch (order.status.toLowerCase()) {
      case 'processing':
        return <Clock size={16} color={Colors.warning[500]} />;
      case 'shipped':
        return <Truck size={16} color={Colors.info[500]} />;
      case 'delivered':
        return <PackageCheck size={16} color={Colors.success[500]} />;
      default:
        return <Clock size={16} color={Colors.warning[500]} />;
    }
  };

  const getStatusColor = () => {
    switch (order.status.toLowerCase()) {
      case 'processing':
        return Colors.warning[500];
      case 'shipped':
        return Colors.info[500];
      case 'delivered':
        return Colors.success[500];
      default:
        return Colors.warning[500];
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        <Text style={styles.date}>
          {new Date(order.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Items:</Text>
          <Text style={styles.infoValue}>{order.items.length}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total:</Text>
          <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
        </View>

        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
            {getStatusIcon()}
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {order.status}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.viewDetailsText}>View Order Details</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  date: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  content: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary[600],
  },
  statusContainer: {
    marginTop: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  footer: {
    backgroundColor: Colors.primary[50],
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary[600],
  },
});