import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Order, OrderItem, updateOrder } from '../../utils/orderStorage';

interface Product {
  id: number;
  name: string;
  brandId: number;
}

export default function EditOrderScreen() {
  const router = useRouter();
  const { orderData } = useLocalSearchParams<{ 
    orderData: string;
  }>();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Parse order data from params
  React.useEffect(() => {
    if (orderData) {
      try {
        const parsedOrder = JSON.parse(orderData);
        setOrder(parsedOrder);
        setOrderItems(parsedOrder.items || []);
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    }
  }, [orderData]);

  // Mock products for all brands (same as new-order.tsx)
  const products: Product[] = [
    // MARICO
    { id: 1, name: 'Parachute Coconut Oil', brandId: 1 },
    { id: 2, name: 'Livon Hair Serum', brandId: 1 },
    { id: 3, name: 'Mediker Anti-Dandruff Shampoo', brandId: 1 },
    
    // GIRNAR
    { id: 4, name: 'Girnar Green Tea', brandId: 2 },
    { id: 5, name: 'Girnar Black Tea', brandId: 2 },
    { id: 6, name: 'Girnar Masala Tea', brandId: 2 },
    
    // RBI
    { id: 7, name: 'RBI Biscuits', brandId: 3 },
    { id: 8, name: 'RBI Cookies', brandId: 3 },
    { id: 9, name: 'RBI Crackers', brandId: 3 },
    
    // PIDILITE
    { id: 10, name: 'Fevicol Adhesive', brandId: 4 },
    { id: 11, name: 'Fevikwik Instant Adhesive', brandId: 4 },
    { id: 12, name: 'Dr. Fixit Waterproofing', brandId: 4 },
    
    // PERFETTI
    { id: 13, name: 'Center Fresh Gum', brandId: 5 },
    { id: 14, name: 'Alpenliebe Candy', brandId: 5 },
    { id: 15, name: 'Chlormint Candy', brandId: 5 },
    
    // CADBURY
    { id: 16, name: 'Dairy Milk Chocolate', brandId: 6 },
    { id: 17, name: '5 Star Chocolate', brandId: 6 },
    { id: 18, name: 'Perk Chocolate', brandId: 6 },
    
    // CAVIN CARE
    { id: 19, name: 'Cavin Care Shampoo', brandId: 7 },
    { id: 20, name: 'Cavin Care Conditioner', brandId: 7 },
    { id: 21, name: 'Cavin Care Hair Oil', brandId: 7 },
    
    // J&J
    { id: 22, name: 'Johnson Baby Powder', brandId: 8 },
    { id: 23, name: 'Johnson Baby Oil', brandId: 8 },
    { id: 24, name: 'Johnson Baby Shampoo', brandId: 8 },
    
    // VICCO
    { id: 25, name: 'Vicco Turmeric Cream', brandId: 9 },
    { id: 26, name: 'Vicco Sandalwood Cream', brandId: 9 },
    { id: 27, name: 'Vicco Toothpaste', brandId: 9 },
    
    // ANCHOR
    { id: 28, name: 'Anchor Butter', brandId: 10 },
    { id: 29, name: 'Anchor Cheese', brandId: 10 },
    { id: 30, name: 'Anchor Milk Powder', brandId: 10 },
    
    // MEDIMIX
    { id: 31, name: 'Medimix Soap', brandId: 11 },
    { id: 32, name: 'Medimix Face Wash', brandId: 11 },
    { id: 33, name: 'Medimix Body Wash', brandId: 11 },
    
    // PORWAL
    { id: 34, name: 'Porwal Spices', brandId: 12 },
    { id: 35, name: 'Porwal Masala', brandId: 12 },
    { id: 36, name: 'Porwal Curry Powder', brandId: 12 },
    
    // Agarbatti
    { id: 37, name: 'Rose Incense Sticks', brandId: 13 },
    { id: 38, name: 'Sandalwood Incense', brandId: 13 },
    { id: 39, name: 'Jasmine Incense', brandId: 13 },
    
    // SAVAAL
    { id: 40, name: 'Savaal Rice', brandId: 14 },
    { id: 41, name: 'Savaal Dal', brandId: 14 },
    { id: 42, name: 'Savaal Flour', brandId: 14 },
    
    // WHITE & WHITE
    { id: 43, name: 'White & White Toothpaste', brandId: 15 },
    { id: 44, name: 'White & White Toothbrush', brandId: 15 },
    { id: 45, name: 'White & White Mouthwash', brandId: 15 },
    
    // PATANJALI
    { id: 46, name: 'Patanjali Honey', brandId: 16 },
    { id: 47, name: 'Patanjali Ghee', brandId: 16 },
    { id: 48, name: 'Patanjali Ayurvedic Medicine', brandId: 16 },
    
    // FERRERO
    { id: 49, name: 'Ferrero Rocher', brandId: 17 },
    { id: 50, name: 'Nutella Spread', brandId: 17 },
    { id: 51, name: 'Kinder Joy', brandId: 17 },
    
    // GODREJ
    { id: 52, name: 'Godrej Hair Dye', brandId: 18 },
    { id: 53, name: 'Godrej Soap', brandId: 18 },
    { id: 54, name: 'Godrej Shampoo', brandId: 18 },
    
    // OXYCOOL
    { id: 55, name: 'Oxycool Deodorant', brandId: 19 },
    { id: 56, name: 'Oxycool Body Spray', brandId: 19 },
    { id: 57, name: 'Oxycool Talc', brandId: 19 },
    
    // Kopiko
    { id: 58, name: 'Kopiko Coffee Candy', brandId: 20 },
    { id: 59, name: 'Kopiko Coffee', brandId: 20 },
    { id: 60, name: 'Kopiko Gum', brandId: 20 },
    
    // RA Masale
    { id: 61, name: 'RA Garam Masala', brandId: 21 },
    { id: 62, name: 'RA Curry Powder', brandId: 21 },
    { id: 63, name: 'RA Biryani Masala', brandId: 21 },
    
    // Himalaya
    { id: 64, name: 'Himalaya Face Cream', brandId: 22 },
    { id: 65, name: 'Himalaya Toothpaste', brandId: 22 },
    { id: 66, name: 'Himalaya Shampoo', brandId: 22 },
  ];

  // Brand data with mock product counts and stock images
  const brands = [
    {
      id: 1,
      name: 'MARICO',
      productCount: 3,
      image: 'https://www.logo.wine/a/logo/Marico/Marico-Logo.wine.svg'
    },
    {
      id: 2,
      name: 'GIRNAR',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=GIRNAR'
    },
    {
      id: 3,
      name: 'RBI',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/45B7D1/FFFFFF?text=RBI'
    },
    {
      id: 4,
      name: 'PIDILITE',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/96CEB4/FFFFFF?text=PIDILITE'
    },
    {
      id: 5,
      name: 'PERFETTI',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/FFEAA7/FFFFFF?text=PERFETTI'
    },
    {
      id: 6,
      name: 'CADBURY',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/DDA0DD/FFFFFF?text=CADBURY'
    },
    {
      id: 7,
      name: 'CAVIN CARE',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/98D8C8/FFFFFF?text=CAVIN'
    },
    {
      id: 8,
      name: 'J&J',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/F7DC6F/FFFFFF?text=J%26J'
    },
    {
      id: 9,
      name: 'VICCO',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/BB8FCE/FFFFFF?text=VICCO'
    },
    {
      id: 10,
      name: 'ANCHOR',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/85C1E9/FFFFFF?text=ANCHOR'
    },
    {
      id: 11,
      name: 'MEDIMIX',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/F8C471/FFFFFF?text=MEDIMIX'
    },
    {
      id: 12,
      name: 'PORWAL',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/82E0AA/FFFFFF?text=PORWAL'
    },
    {
      id: 13,
      name: 'Agarbatti',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/F1948A/FFFFFF?text=AGARBATTI'
    },
    {
      id: 14,
      name: 'SAVAAL',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/85C1E9/FFFFFF?text=SAVAAL'
    },
    {
      id: 15,
      name: 'WHITE & WHITE',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/D5DBDB/FFFFFF?text=W%26W'
    },
    {
      id: 16,
      name: 'PATANJALI',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/58D68D/FFFFFF?text=PATANJALI'
    },
    {
      id: 17,
      name: 'FERRERO',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/F39C12/FFFFFF?text=FERRERO'
    },
    {
      id: 18,
      name: 'GODREJ',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/5DADE2/FFFFFF?text=GODREJ'
    },
    {
      id: 19,
      name: 'OXYCOOL',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/7FB3D3/FFFFFF?text=OXYCOOL'
    },
    {
      id: 20,
      name: 'Kopiko',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/EC7063/FFFFFF?text=KOPIKO'
    },
    {
      id: 21,
      name: 'RA Masale',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/F4D03F/FFFFFF?text=RA+MASALE'
    },
    {
      id: 22,
      name: 'Himalaya',
      productCount: 3,
      image: 'https://via.placeholder.com/150x100/48C9B0/FFFFFF?text=HIMALAYA'
    }
  ];

  const getBrandProducts = (brandId: number) => {
    return products.filter(product => product.brandId === brandId);
  };

  const handleBrandPress = (brand: any) => {
    setSelectedBrand(brand);
    setIsModalVisible(true);
  };

  const handleAddToOrder = (product: Product, unit: 'Pc' | 'Outer' | 'Case', quantity: number) => {
    setOrderItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.productId === product.id && item.unit === unit
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity = quantity;
        return updatedItems;
      } else {
        // Add new item
        const newItem: OrderItem = {
          productId: product.id,
          productName: product.name,
          brandName: selectedBrand.name,
          unit,
          quantity
        };
        return [...prevItems, newItem];
      }
    });
  };

  const handleUpdateQuantity = (productId: number, unit: 'Pc' | 'Outer' | 'Case', newQuantity: number) => {
    setOrderItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.productId === productId && item.unit === unit) {
          return { ...item, quantity: Math.max(0, newQuantity) };
        }
        return item;
      });
      
      // Remove items with quantity 0
      return updatedItems.filter(item => item.quantity > 0);
    });
  };

  const handleRemoveItem = (productId: number, unit: 'Pc' | 'Outer' | 'Case') => {
    setOrderItems(prevItems => 
      prevItems.filter(item => !(item.productId === productId && item.unit === unit))
    );
  };

  const getTotalItems = () => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSaveOrder = async () => {
    if (!order) return;
    
    if (orderItems.length === 0) {
      Alert.alert('Error', 'Please add items to your order before saving.');
      return;
    }

    setIsSaving(true);
    
    try {
      const totalItems = orderItems.reduce((total, item) => total + item.quantity, 0);
      
      await updateOrder(order.id, {
        items: orderItems,
        totalItems: totalItems,
        // Update the order with current items
      });

      Alert.alert(
        'Order Updated!', 
        `Order ${order.orderNumber} has been updated successfully.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back to orders screen
              router.push('/(tabs)/orders');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error updating order:', error);
      Alert.alert('Error', 'Failed to update order. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleMarkAsCompleted = async () => {
    if (!order) return;

    Alert.alert(
      'Mark Order as Completed',
      `Are you sure you want to mark order ${order.orderNumber} as completed?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Complete',
          style: 'default',
          onPress: async () => {
            setIsSaving(true);
            
            try {
              const totalItems = orderItems.reduce((total, item) => total + item.quantity, 0);
              
              await updateOrder(order.id, {
                items: orderItems,
                totalItems: totalItems,
                status: 'Completed',
              });

              Alert.alert(
                'Order Completed!', 
                `Order ${order.orderNumber} has been marked as completed successfully.`,
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      // Navigate back to orders screen
                      router.push('/(tabs)/orders');
                    }
                  }
                ]
              );
            } catch (error) {
              console.error('Error completing order:', error);
              Alert.alert('Error', 'Failed to complete order. Please try again.');
            } finally {
              setIsSaving(false);
            }
          },
        },
      ]
    );
  };

  const ProductModal = () => {
    const [productSelections, setProductSelections] = useState<{[key: number]: {unit: 'Pc' | 'Outer' | 'Case', quantity: number}}>({});

    const handleUnitChange = (productId: number, unit: 'Pc' | 'Outer' | 'Case') => {
      setProductSelections(prev => ({
        ...prev,
        [productId]: {
          unit,
          quantity: prev[productId]?.quantity || 0
        }
      }));
    };

    const handleQuantityChange = (productId: number, quantity: number) => {
      setProductSelections(prev => ({
        ...prev,
        [productId]: {
          unit: prev[productId]?.unit || 'Pc',
          quantity: Math.max(0, quantity)
        }
      }));
    };

    const handleAddSelected = () => {
      Object.entries(productSelections).forEach(([productId, selection]) => {
        if (selection.quantity > 0) {
          const product = products.find(p => p.id === parseInt(productId));
          if (product) {
            handleAddToOrder(product, selection.unit, selection.quantity);
          }
        }
      });
      setIsModalVisible(false);
      setProductSelections({});
    };

    const brandProducts = selectedBrand ? getBrandProducts(selectedBrand.id) : [];

    return (
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Products</Text>
            <TouchableOpacity onPress={handleAddSelected}>
              <Text style={styles.addButton}>Add</Text>
            </TouchableOpacity>
          </View>

          {/* Category Header */}
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>{selectedBrand?.name}</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Products List */}
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {brandProducts.map((product) => (
              <View key={product.id} style={styles.productItem}>
                {/* Product Name */}
                <Text style={styles.productName}>{product.name}</Text>
                
                {/* Unit Selection and Quantity - Inline */}
                <View style={styles.productControls}>
                  {/* Unit Selection */}
                  <View style={styles.unitSelection}>
                    {(['Pc', 'Outer', 'Case'] as const).map((unit) => (
                      <TouchableOpacity
                        key={unit}
                        style={[
                          styles.unitButton,
                          productSelections[product.id]?.unit === unit && styles.unitButtonSelected
                        ]}
                        onPress={() => handleUnitChange(product.id, unit)}
                      >
                        <Text style={[
                          styles.unitText,
                          productSelections[product.id]?.unit === unit && styles.unitTextSelected
                        ]}>
                          {unit}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Quantity Selection */}
                  <View style={styles.quantitySection}>
                    <TouchableOpacity
                      style={[
                        styles.quantityControls,
                        (productSelections[product.id]?.quantity || 0) > 0 && styles.quantityControlsSelected
                      ]}
                    >
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(product.id, (productSelections[product.id]?.quantity || 0) - 1)}
                      >
                        <Ionicons 
                          name="remove" 
                          size={16} 
                          color={(productSelections[product.id]?.quantity || 0) > 0 ? "#ffffff" : "#8B5CF6"} 
                        />
                      </TouchableOpacity>
                      <Text style={[
                        styles.quantityText,
                        (productSelections[product.id]?.quantity || 0) > 0 && styles.quantityTextSelected
                      ]}>
                        {productSelections[product.id]?.quantity || 0}
                      </Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(product.id, (productSelections[product.id]?.quantity || 0) + 1)}
                      >
                        <Ionicons 
                          name="add" 
                          size={16} 
                          color={(productSelections[product.id]?.quantity || 0) ? "#ffffff" : "#8B5CF6"} 
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  const OrderItemCard = ({ item }: { item: OrderItem }) => (
    <View style={styles.orderItemCard}>
      <View style={styles.orderItemInfo}>
        <Text style={styles.orderItemName}>{item.productName}</Text>
        <Text style={styles.orderItemBrand}>{item.brandName} • {item.unit}</Text>
      </View>
      
      <View style={styles.orderItemControls}>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.productId, item.unit, item.quantity - 1)}
          >
            <Ionicons name="remove" size={16} color="#8B5CF6" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.productId, item.unit, item.quantity + 1)}
          >
            <Ionicons name="add" size={16} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.productId, item.unit)}
        >
          <Ionicons name="trash-outline" size={16} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const BrandCard = ({ brand }: { brand: any }) => (
    <TouchableOpacity 
      style={styles.brandCard}
      onPress={() => handleBrandPress(brand)}
    >
      <Image source={{ uri: brand.image }} style={styles.brandImage} />
      <View style={styles.brandInfo}>
        <Text style={styles.brandName}>{brand.name}</Text>
        <Text style={styles.productCount}>{brand.productCount} Products</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  if (!order) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading order...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Order</Text>
        <View style={styles.headerActions}>
          {order?.status === 'Pending' && (
            <TouchableOpacity 
              style={styles.completeButton}
              onPress={handleMarkAsCompleted}
              disabled={isSaving}
            >
              <Text style={styles.completeButtonText}>Complete</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleSaveOrder} disabled={isSaving}>
            <Text style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}>
              {isSaving ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Order Info Section */}
      <View style={styles.orderInfoSection}>
        <View style={styles.orderInfoHeader}>
          <Text style={styles.orderInfoTitle}>Order Details</Text>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
        </View>
        
        <View style={styles.retailerInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="storefront-outline" size={20} color="#007AFF" />
            <Text style={styles.infoLabel}>Retailer Name:</Text>
            <Text style={styles.infoValue}>{order.counterName}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color="#007AFF" />
            <Text style={styles.infoLabel}>Phone No:</Text>
            <Text style={styles.infoValue}>+91 9876543210</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#007AFF" />
            <Text style={styles.infoLabel}>Bit:</Text>
            <Text style={styles.infoValue}>{order.bit}</Text>
          </View>
        </View>
      </View>

      {/* Order Items Section */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Order Items ({orderItems.length})</Text>
        </View>
        
        <View style={styles.orderItemsList}>
          {orderItems.map((item, index) => (
            <OrderItemCard key={`${item.productId}-${item.unit}-${index}`} item={item} />
          ))}
        </View>


        {/* Brands List */}
        <View style={styles.brandsSection}>
          <Text style={styles.brandsTitle}>Available Brands</Text>
          <View style={styles.brandsList}>
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Summary */}
      {orderItems.length > 0 && (
        <View style={styles.bottomSummary}>
          <View style={styles.summaryContent}>
            <Ionicons name="cube-outline" size={20} color="#007AFF" />
            <Text style={styles.summaryText}>
              Total Items: {getTotalItems()} Updated
            </Text>
          </View>
        </View>
      )}

      <ProductModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5ea',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  completeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  saveButtonDisabled: {
    color: '#cccccc',
  },
  orderInfoSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  retailerInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    minWidth: 100,
  },
  infoValue: {
    fontSize: 14,
    color: '#1a1a1a',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  orderItemsList: {
    gap: 12,
    marginBottom: 20,
  },
  orderItemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  orderItemBrand: {
    fontSize: 14,
    color: '#666666',
  },
  orderItemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8B5CF6',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  quantityButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
    paddingHorizontal: 12,
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFF5F5',
  },
  brandsSection: {
    marginBottom: 20,
  },
  brandsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  brandsList: {
    gap: 12,
  },
  brandCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  brandImage: {
    width: 60,
    height: 40,
    borderRadius: 8,
    marginRight: 16,
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  productCount: {
    fontSize: 14,
    color: '#666666',
  },
  bottomSummary: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e5ea',
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 8,
  },
  // Modal Styles (same as new-order.tsx)
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#8B5CF6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  productItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  productControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitSelection: {
    flexDirection: 'row',
    gap: 8,
  },
  unitButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  unitButtonSelected: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  unitText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  unitTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  quantitySection: {
    alignItems: 'center',
  },
  quantityControlsSelected: {
    backgroundColor: '#8B5CF6',
  },
  quantityTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
