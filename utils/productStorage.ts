import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Product {
  id: number;
  name: string;
  brandId: number;
  brandName: string;
}

export interface Brand {
  id: number;
  name: string;
  productCount: number;
  image: string;
}

const PRODUCTS_KEY = '@products';
const BRANDS_KEY = '@brands';

// Initialize data if not exists
export const initializeProductData = async (): Promise<void> => {
  try {
    const existingProducts = await AsyncStorage.getItem(PRODUCTS_KEY);
    const existingBrands = await AsyncStorage.getItem(BRANDS_KEY);
    
    if (!existingProducts) {
      await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify([]));
    }
    
    if (!existingBrands) {
      await AsyncStorage.setItem(BRANDS_KEY, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Error initializing product data:', error);
  }
};

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const storedProducts = await AsyncStorage.getItem(PRODUCTS_KEY);
    if (storedProducts) {
      return JSON.parse(storedProducts);
    } else {
      // Initialize with empty array if not exists
      await initializeProductData();
      return [];
    }
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

// Get all brands
export const getBrands = async (): Promise<Brand[]> => {
  try {
    const storedBrands = await AsyncStorage.getItem(BRANDS_KEY);
    if (storedBrands) {
      return JSON.parse(storedBrands);
    } else {
      // Initialize with empty array if not exists
      await initializeProductData();
      return [];
    }
  } catch (error) {
    console.error('Error getting brands:', error);
    return [];
  }
};

// Get products by brand
export const getProductsByBrand = async (brandId: number): Promise<Product[]> => {
  try {
    const products = await getProducts();
    return products.filter(product => product.brandId === brandId);
  } catch (error) {
    console.error('Error getting products by brand:', error);
    return [];
  }
};

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const products = await getProducts();
    const lowercaseQuery = query.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.brandName.toLowerCase().includes(lowercaseQuery)
    );
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

// Add a new product
export const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  try {
    const existingProducts = await getProducts();
    
    // Generate new ID
    const newId = Math.max(...existingProducts.map(p => p.id), 0) + 1;
    
    const newProduct: Product = {
      id: newId,
      ...productData,
    };
    
    const updatedProducts = [...existingProducts, newProduct];
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));
    
    return newProduct;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (productId: number, updates: Partial<Omit<Product, 'id'>>): Promise<Product | null> => {
  try {
    const products = await getProducts();
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
      return null;
    }
    
    products[productIndex] = { ...products[productIndex], ...updates };
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    
    return products[productIndex];
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId: number): Promise<boolean> => {
  try {
    const products = await getProducts();
    const filteredProducts = products.filter(p => p.id !== productId);
    
    if (filteredProducts.length === products.length) {
      return false; // Product not found
    }
    
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(filteredProducts));
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const products = await getProducts();
    return products.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Error getting product by ID:', error);
    return null;
  }
};

// Get unique brand names for filtering
export const getUniqueBrandNames = async (): Promise<string[]> => {
  try {
    const brands = await getBrands();
    return brands.map(brand => brand.name).sort();
  } catch (error) {
    console.error('Error getting unique brand names:', error);
    return [];
  }
};

// Add a new brand
export const addBrand = async (brandData: Omit<Brand, 'id'>): Promise<Brand> => {
  try {
    const existingBrands = await getBrands();
    
    // Generate new ID
    const newId = Math.max(...existingBrands.map(b => b.id), 0) + 1;
    
    const newBrand: Brand = {
      id: newId,
      ...brandData,
    };
    
    const updatedBrands = [...existingBrands, newBrand];
    await AsyncStorage.setItem(BRANDS_KEY, JSON.stringify(updatedBrands));
    
    return newBrand;
  } catch (error) {
    console.error('Error adding brand:', error);
    throw error;
  }
};
