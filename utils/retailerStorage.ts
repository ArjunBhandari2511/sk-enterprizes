import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Retailer {
  id: number;
  name: string;
  phone: string;
  bit: string;
  createdAt: string;
}

const RETAILERS_STORAGE_KEY = 'retailers';

// Get all retailers
export const getRetailers = async (): Promise<Retailer[]> => {
  try {
    const retailersData = await AsyncStorage.getItem(RETAILERS_STORAGE_KEY);
    if (retailersData) {
      return JSON.parse(retailersData);
    }
    return [];
  } catch (error) {
    console.error('Error getting retailers:', error);
    return [];
  }
};

// Add a new retailer
export const addRetailer = async (retailerData: Omit<Retailer, 'id' | 'createdAt'>): Promise<Retailer> => {
  try {
    const existingRetailers = await getRetailers();
    
    // Generate new ID
    const newId = existingRetailers.length > 0 
      ? Math.max(...existingRetailers.map(r => r.id)) + 1 
      : 1;
    
    const newRetailer: Retailer = {
      id: newId,
      ...retailerData,
      createdAt: new Date().toISOString(),
    };
    
    const updatedRetailers = [...existingRetailers, newRetailer];
    await AsyncStorage.setItem(RETAILERS_STORAGE_KEY, JSON.stringify(updatedRetailers));
    
    return newRetailer;
  } catch (error) {
    console.error('Error adding retailer:', error);
    throw error;
  }
};

// Update a retailer
export const updateRetailer = async (id: number, updates: Partial<Omit<Retailer, 'id' | 'createdAt'>>): Promise<Retailer | null> => {
  try {
    const retailers = await getRetailers();
    const retailerIndex = retailers.findIndex(r => r.id === id);
    
    if (retailerIndex === -1) {
      return null;
    }
    
    retailers[retailerIndex] = { ...retailers[retailerIndex], ...updates };
    await AsyncStorage.setItem(RETAILERS_STORAGE_KEY, JSON.stringify(retailers));
    
    return retailers[retailerIndex];
  } catch (error) {
    console.error('Error updating retailer:', error);
    throw error;
  }
};

// Delete a retailer
export const deleteRetailer = async (id: number): Promise<boolean> => {
  try {
    const retailers = await getRetailers();
    const filteredRetailers = retailers.filter(r => r.id !== id);
    
    if (filteredRetailers.length === retailers.length) {
      return false; // Retailer not found
    }
    
    await AsyncStorage.setItem(RETAILERS_STORAGE_KEY, JSON.stringify(filteredRetailers));
    return true;
  } catch (error) {
    console.error('Error deleting retailer:', error);
    throw error;
  }
};

// Get retailer by ID
export const getRetailerById = async (id: number): Promise<Retailer | null> => {
  try {
    const retailers = await getRetailers();
    return retailers.find(r => r.id === id) || null;
  } catch (error) {
    console.error('Error getting retailer by ID:', error);
    return null;
  }
};

// Get retailers by bit
export const getRetailersByBit = async (bit: string): Promise<Retailer[]> => {
  try {
    const retailers = await getRetailers();
    return retailers.filter(r => r.bit === bit);
  } catch (error) {
    console.error('Error getting retailers by bit:', error);
    return [];
  }
};

// Search retailers
export const searchRetailers = async (query: string): Promise<Retailer[]> => {
  try {
    const retailers = await getRetailers();
    const lowercaseQuery = query.toLowerCase();
    
    return retailers.filter(retailer => 
      retailer.name.toLowerCase().includes(lowercaseQuery) ||
      retailer.phone.includes(query) ||
      retailer.bit.toLowerCase().includes(lowercaseQuery)
    );
  } catch (error) {
    console.error('Error searching retailers:', error);
    return [];
  }
};
