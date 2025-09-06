import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  
  // Mock data for demonstration
  const stats = {
    totalOrders: 156,
    totalItems: 1247,
    pendingOrders: 23,
    totalBits: 8,
  };

  const recentOrders = [
    {
      id: 1,
      counterName: 'Rajesh Kumar',
      totalItems: 45,
      date: '2024-01-15',
      status: 'Pending',
    },
    {
      id: 2,
      counterName: 'Priya Sharma',
      totalItems: 32,
      date: '2024-01-14',
      status: 'Completed',
    },
    {
      id: 3,
      counterName: 'Amit Singh',
      totalItems: 28,
      date: '2024-01-13',
      status: 'Pending',
    },
  ];

  const StatCard = ({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statContent}>
        <View style={styles.statHeader}>
          <Ionicons name={icon as any} size={24} color={color} />
          <Text style={styles.statValue}>{value}</Text>
        </View>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  const OrderCard = ({ order }: { order: any }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.counterName}>{order.counterName}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: order.status === 'Completed' ? '#4CAF50' : '#FF9800' }
        ]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>
      <View style={styles.orderDetails}>
        <View style={styles.orderDetailItem}>
          <Ionicons name="cube-outline" size={16} color="#666" />
          <Text style={styles.orderDetailText}>{order.totalItems} items</Text>
        </View>
        <View style={styles.orderDetailItem}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.orderDetailText}>{order.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <ScrollView style={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome to Komal Agencies</Text>
        </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon="receipt-outline"
          color="#007AFF"
        />
        <StatCard
          title="Total Items"
          value={stats.totalItems}
          icon="cube-outline"
          color="#34C759"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon="time-outline"
          color="#FF9500"
        />
        <StatCard
          title="Total Bits"
          value={stats.totalBits}
          icon="location-outline"
          color="#AF52DE"
        />
      </View>

      {/* Recent Orders Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.ordersList}>
          {recentOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5ea',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    width: '48%',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statContent: {
    flex: 1,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statTitle: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  viewAllText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  ordersList: {
    gap: 12,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  counterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  orderDetailText: {
    fontSize: 14,
    color: '#666666',
  },
});
