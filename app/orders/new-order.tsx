import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Product {
  id: number;
  name: string;
  brandId: number;
}

interface SelectedItem {
  productId: number;
  productName: string;
  brandName: string;
  unit: 'Pc' | 'Outer' | 'Case';
  quantity: number;
}

export default function NewOrderScreen() {
  const router = useRouter();
  const { retailerName, retailerPhone, retailerBit } = useLocalSearchParams<{ 
    retailerName: string;
    retailerPhone: string;
    retailerBit: string;
  }>();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  // Mock products for all brands (3 products per brand)
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
      image: 'https://marico.com/optimized/256x0/images/marico.jpg'
    },
    {
      id: 2,
      name: 'GIRNAR',
      productCount: 3,
      image: 'https://girnar.com/wp-content/uploads/2022/03/gt-1.png'
    },
    {
      id: 3,
      name: 'RBI',
      productCount: 3,
      image: 'https://marico.com/optimized/256x0/images/marico.jpg'
    },
    {
      id: 4,
      name: 'PIDILITE',
      productCount: 3,
      image: 'https://assets.pidilite.com/is/image/pidilite/pidilite-logo-1?ts=1717678989820&dpr=off'
    },
    {
      id: 5,
      name: 'PERFETTI',
      productCount: 3,
      image: 'https://www.perfettivanmelle.com/assets/images/site_objects/sitelogo.png'
    },
    {
      id: 6,
      name: 'CADBURY',
      productCount: 3,
      image: 'https://logos-world.net/wp-content/uploads/2022/05/Cadbury-Logo.png'
    },
    {
      id: 7,
      name: 'CAVIN CARE',
      productCount: 3,
      image: 'https://www.symtrax.com/wp-content/uploads/2020/08/CavinKare-logo-270x180.png'
    },
    {
      id: 8,
      name: 'J&J',
      productCount: 3,
      image: 'https://i.pinimg.com/736x/54/d4/5f/54d45fef93b4eb4d265b80768d1364d9.jpg'
    },
    {
      id: 9,
      name: 'VICCO',
      productCount: 3,
      image: 'https://m.media-amazon.com/images/S/stores-image-uploads-eu-prod/3/AmazonStores/A21TJRUUN4KGV/50128a82035cf3c3c3645ba9d4762a6c.w2478.h784.jpg'
    },
    {
      id: 10,
      name: 'ANCHOR',
      productCount: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS7jE_fjOcVL4QGGZecw2eeNogIVNudduarA&s'
    },
    {
      id: 11,
      name: 'MEDIMIX',
      productCount: 3,
      image: 'https://mir-s3-cdn-cf.behance.net/projects/404/c33a2f198833157.Y3JvcCwxNzg5LDE0MDAsNTA1LDA.png'
    },
    {
      id: 12,
      name: 'PORWAL',
      productCount: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4NXd-jROKBmNGC8JLkOjPUW6nmqgJC8qjuw&s'
    },
    {
      id: 13,
      name: 'Agarbatti',
      productCount: 3,
      image: 'https://t4.ftcdn.net/jpg/10/90/35/39/360_F_1090353913_XYL8s1ZIE6iqN8Q2OzYxxPjAxCzHD4iD.jpg'
    },
    {
      id: 14,
      name: 'SAVAAL',
      productCount: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaALSA10lD0qmrnCPjca8vqt0Pis-oN9hzRg&s'
    },
    {
      id: 15,
      name: 'WHITE & WHITE',
      productCount: 3,
      image: 'https://img.freepik.com/free-vector/white-interior-studio-logo-design_53876-40512.jpg'
    },
    {
      id: 16,
      name: 'PATANJALI',
      productCount: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxQ4crgfsf8bfVYfOknLKBJenshAIkDHHllg&s'
    },
    {
      id: 17,
      name: 'FERRERO',
      productCount: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy7G-pcysugUWhhRXiNg4N3G-1YRXzwTJpPQ&s'
    },
    {
      id: 18,
      name: 'GODREJ',
      productCount: 3,
      image: 'https://images.seeklogo.com/logo-png/6/2/godrej-logo-png_seeklogo-61759.png'
    },
    {
      id: 19,
      name: 'OXYCOOL',
      productCount: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjVHxI-2wQo6ixaWRQKcGnoBO8Zpp24m-Dgg&s'
    },
    {
      id: 20,
      name: 'Kopiko',
      productCount: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYTL5C1KvMJpjTi30j43Zn03gnwDoigcrOEw&s'
    },
    {
      id: 21,
      name: 'RA Masale',
      productCount: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhv1okNmTyU78FtmUfbOHD6twfLh-YfpXmVw&s'
    },
    {
      id: 22,
      name: 'Himalaya',
      productCount: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRshDsI_53EDbls-bMrd1m5Bj0294d2o0zGSQ&s'
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
    setSelectedItems(prevItems => {
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
        const newItem: SelectedItem = {
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

  const getTotalItems = () => {
    return selectedItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleNavigateToSummary = () => {
    router.push({
      pathname: '/orders/order-summary',
      params: {
        retailerName: retailerName || 'N/A',
        retailerPhone: retailerPhone || 'N/A',
        retailerBit: retailerBit || 'N/A',
        orderItems: JSON.stringify(selectedItems)
      }
    });
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
                          color={(productSelections[product.id]?.quantity || 0) > 0 ? "#ffffff" : "#8B5CF6"} 
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
        <Text style={styles.headerTitle}>New Order</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeContent}>
          <View style={styles.welcomeIconContainer}>
            <Ionicons name="storefront" size={32} color="#007AFF" />
          </View>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeGreeting}>Welcome back!</Text>
            <Text style={styles.welcomeText}>
              {retailerName || 'Retailer'}
            </Text>
            <Text style={styles.subtitleText}>
              Select a brand to start creating your order
            </Text>
          </View>
        </View>
      </View>

      {/* Brands Section */}
      <ScrollView style={styles.brandsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.brandsHeader}>
          <Text style={styles.brandsTitle}>
            Available Brands ({brands.length})
          </Text>
        </View>
        
        <View style={styles.brandsList}>
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Summary */}
      {selectedItems.length > 0 && (
        <TouchableOpacity style={styles.bottomSummary} onPress={handleNavigateToSummary}>
          <View style={styles.summaryContent}>
            <Ionicons name="cube-outline" size={20} color="#007AFF" />
            <Text style={styles.summaryText}>
              Total Items: {getTotalItems()} Added
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#007AFF" />
        </TouchableOpacity>
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
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  placeholder: {
    width: 34,
  },
  welcomeSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeGreeting: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  subtitleText: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 20,
  },
  brandsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  brandsHeader: {
    paddingVertical: 15,
  },
  brandsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  brandsList: {
    gap: 12,
    paddingBottom: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 8,
  },
  // Modal Styles
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
    backgroundColor: '#8B5CF6', // Purple header like in image
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
    color: '#8B5CF6', // Purple brand name
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
  quantityControlsSelected: {
    backgroundColor: '#8B5CF6',
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
  quantityTextSelected: {
    color: '#ffffff',
  },
});