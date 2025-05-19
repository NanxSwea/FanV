import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface OrderStatusTimelineProps {
  status: string;
}

export function OrderStatusTimeline({ status }: OrderStatusTimelineProps) {
  const statuses = ['placed', 'processing', 'shipped', 'delivered'];
  const currentIndex = statuses.findIndex(s => 
    s.toLowerCase() === status.toLowerCase()
  );
  
  if (currentIndex === -1) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Status</Text>
      
      <View style={styles.timeline}>
        {statuses.map((statusItem, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          
          return (
            <View key={statusItem} style={styles.timelineItem}>
              <View style={styles.timelineContent}>
                <View 
                  style={[
                    styles.dot,
                    isCompleted ? styles.completedDot : styles.pendingDot,
                    isActive ? styles.activeDot : {},
                  ]}
                />
                
                {index < statuses.length - 1 && (
                  <View 
                    style={[
                      styles.line,
                      isCompleted && index < currentIndex ? styles.completedLine : styles.pendingLine,
                    ]} 
                  />
                )}
              </View>
              
              <View style={styles.labelContainer}>
                <Text 
                  style={[
                    styles.label,
                    isCompleted ? styles.completedLabel : styles.pendingLabel,
                    isActive ? styles.activeLabel : {},
                  ]}
                >
                  {statusItem.charAt(0).toUpperCase() + statusItem.slice(1)}
                </Text>
                
                {isActive && (
                  <Text style={styles.dateLabel}>
                    {new Date().toLocaleDateString()}
                  </Text>
                )}
                
                {isCompleted && !isActive && (
                  <Text style={styles.dateLabel}>
                    {new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  timeline: {
    marginLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineContent: {
    alignItems: 'center',
    marginRight: 16,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    marginBottom: 8,
  },
  completedDot: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[200],
  },
  pendingDot: {
    backgroundColor: Colors.white,
    borderColor: Colors.border,
  },
  activeDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 4,
  },
  line: {
    width: 3,
    height: 40,
    position: 'absolute',
    top: 20,
  },
  completedLine: {
    backgroundColor: Colors.primary[600],
  },
  pendingLine: {
    backgroundColor: Colors.border,
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  completedLabel: {
    fontWeight: '600',
    color: Colors.text.primary,
  },
  pendingLabel: {
    color: Colors.text.secondary,
  },
  activeLabel: {
    fontWeight: '700',
    color: Colors.primary[600],
  },
  dateLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
});