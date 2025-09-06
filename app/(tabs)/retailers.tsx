import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RetailersScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('all');

  // Mock data for bits (locations) - formatted for dropdown picker
  const bits = [
    { label: 'All Bits', value: 'all' },
    { label: 'Turori', value: 'bit1' },
    { label: 'Naldurg & Jalkot', value: 'bit2' },
    { label: 'Gunjoti & Murum', value: 'bit3' },
    { label: 'Dalimb & Yenegur', value: 'bit4' },
    { label: 'Sastur & Makhani', value: 'bit5' },
    { label: 'Narangwadi & Killari', value: 'bit6' },
    { label: 'Andur', value: 'bit7' },
    { label: 'Omerga', value: 'bit8' },
  ];

  // Mock retailers data
  const retailers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      bit: 'Turori',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      phone: '+91 87654 32109',
      bit: 'Naldurg & Jalkot',
    },
    {
      id: 3,
      name: 'Amit Singh',
      phone: '+91 76543 21098',
      bit: 'Gunjoti & Murum',
    },
    {
      id: 4,
      name: 'Sneha Patel',
      phone: '+91 65432 10987',
      bit: 'Dalimb & Yenegur',
    },
    {
      id: 5,
      name: 'Vikram Reddy',
      phone: '+91 54321 09876',
      bit: 'Sastur & Makhani',
    },
    {
      id: 6,
      name: 'Kunal Kumar',
      phone: '+91 43210 98765',
      bit: 'Narangwadi & Killari',
    },
    {
      id: 7,
      name: 'Anita Desai',
      phone: '+91 32109 87654',
      bit: 'Andur',
    },
    {
      id: 8,
      name: 'Rohit Gupta',
      phone: '+91 21098 76543',
      bit: 'Omerga',
    },
  ];

  // Filter retailers based on selected bit and search query
  const filteredRetailers = retailers.filter(retailer => {
    const selectedBitName = bits.find(bit => bit.value === value)?.label || 'All Bits';
    const matchesBit = value === 'all' || retailer.bit === selectedBitName;
    const matchesSearch = retailer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         retailer.phone.includes(searchQuery);
    
    return matchesBit && matchesSearch;
  });

  const BitsChooser = () => (
    <View style={styles.bitsChooserContainer}>
      <DropDownPicker
        open={open}
        value={value}
        items={bits}
        setOpen={setOpen}
        setValue={setValue}
        placeholder="Select Bit"
        style={styles.dropdownPicker}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        arrowIconStyle={styles.arrowIcon}
        tickIconStyle={styles.tickIcon}
        zIndex={3000}
        zIndexInverse={1000}
        dropDownDirection="BOTTOM"
        closeAfterSelecting={true}
        showTickIcon={true}
        showArrowIcon={true}
        searchable={false}
        listMode="FLATLIST"
        maxHeight={400}
        flatListProps={{
          initialNumToRender: 9,
        }}
      />
    </View>
  );

  const SearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search retailers..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );

  const RetailerCard = ({ retailer }: { retailer: any }) => (
    <TouchableOpacity 
      style={styles.retailerCard}
      onPress={() => router.push({
        pathname: '/orders/new-order',
        params: { 
          retailerName: retailer.name,
          retailerPhone: retailer.phone,
          retailerBit: retailer.bit
        }
      })}
    >
      <View style={styles.retailerHeader}>
        <View style={styles.retailerInfo}>
          <Text style={styles.retailerName}>{retailer.name}</Text>
          <Text style={styles.retailerPhone}>{retailer.phone}</Text>
        </View>
        <View style={styles.bitBadge}>
          <Ionicons name="location-outline" size={16} color="#007AFF" />
          <Text style={styles.bitText}>{retailer.bit}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header with Bits Chooser */}
      <View style={styles.header}>
        <BitsChooser />
      </View>

      {/* Search Bar */}
      <SearchBar />

      {/* Retailers List */}
      <ScrollView style={styles.retailersContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.retailersHeader}>
          <Text style={styles.retailersTitle}>
            Retailers ({filteredRetailers.length})
          </Text>
        </View>
        
        <View style={styles.retailersList}>
          {filteredRetailers.map((retailer) => (
            <RetailerCard key={retailer.id} retailer={retailer} />
          ))}
        </View>
        
        {filteredRetailers.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="storefront-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No retailers found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or bit selection</Text>
          </View>
        )}
      </ScrollView>
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
  bitsChooserContainer: {
    position: 'relative',
    zIndex: 1000,
    width: '100%',
  },
  dropdownPicker: {
    backgroundColor: '#f0f8ff',
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 20,
    minHeight: 40,
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e5ea',
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 5,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  tickIcon: {
    width: 16,
    height: 16,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  retailersContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  retailersHeader: {
    paddingVertical: 15,
  },
  retailersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  retailersList: {
    gap: 12,
    paddingBottom: 20,
  },
  retailerCard: {
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
  retailerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  retailerInfo: {
    flex: 1,
  },
  retailerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  retailerPhone: {
    fontSize: 14,
    color: '#666666',
  },
  bitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  bitText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    marginTop: 4,
    textAlign: 'center',
  },
});
