import AsyncStorage from '@react-native-async-storage/async-storage';

export interface OrderItem {
  productId: number;
  productName: string;
  brandName: string;
  unit: 'Pc' | 'Outer' | 'Case';
  quantity: number;
}

export interface Order {
  id: number;
  counterName: string;
  bit: string;
  totalItems: number;
  totalAmount: number;
  date: string;
  time?: string;
  status: 'Pending' | 'Completed';
  orderNumber: string;
  items?: OrderItem[];
}

const ORDERS_KEY = '@orders';


// Get all orders
export const getOrders = async (): Promise<Order[]> => {
  try {
    const storedOrders = await AsyncStorage.getItem(ORDERS_KEY);
    if (storedOrders) {
      return JSON.parse(storedOrders);
    } else {
      // Return empty array if no stored orders
      return [];
    }
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

// Add a new order
export const addOrder = async (order: Omit<Order, 'id' | 'orderNumber' | 'date' | 'time'>, items?: OrderItem[]): Promise<Order> => {
  try {
    const existingOrders = await getOrders();
    
    // Generate new ID
    const newId = Math.max(...existingOrders.map(o => o.id), 0) + 1;
    
    // Generate order number
    const orderNumber = `ORD-${String(newId).padStart(3, '0')}`;
    
    // Get current date
    const now = new Date();
    const date = now.toLocaleDateString('en-GB'); // DD/MM/YYYY format
    
    const newOrder: Order = {
      ...order,
      id: newId,
      orderNumber,
      date,
      items: items || [],
    };
    
    const updatedOrders = [newOrder, ...existingOrders];
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    
    return newOrder;
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId: number, status: 'Pending' | 'Completed'): Promise<void> => {
  try {
    const orders = await getOrders();
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Update an existing order
export const updateOrder = async (orderId: number, updatedOrder: Partial<Order>): Promise<void> => {
  try {
    const orders = await getOrders();
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, ...updatedOrder } : order
    );
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

// Delete an order
export const deleteOrder = async (orderId: number): Promise<void> => {
  try {
    const orders = await getOrders();
    const updatedOrders = orders.filter(order => order.id !== orderId);
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// Get orders by bit
export const getOrdersByBit = async (bit: string): Promise<Order[]> => {
  try {
    const orders = await getOrders();
    return bit === 'all' ? orders : orders.filter(order => order.bit === bit);
  } catch (error) {
    console.error('Error getting orders by bit:', error);
    return [];
  }
};
