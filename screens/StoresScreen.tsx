import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Define types for navigation
type RootTabParamList = {
  Products: undefined;
  Cart: undefined;
  Scanner: undefined;
  Stores: undefined;
};

type StoresScreenNavigationProp = any; // Use 'any' or define properly if needed later

// Mock store data (migrate from Next.js)
const STORES = [
  {
    id: 1,
    name: "Whole Foods Market",
    address: "2210 Westlake Ave, Seattle, WA 98121",
    distance: "0.8 miles",
    rating: 4.7,
    specialFeatures: ["Organic", "Vegan-Friendly"],
    image: require('../assets/whole-foods-logo.png'),
  },
  {
    id: 2,
    name: "Trader Joe's",
    address: "1916 Queen Anne Ave N, Seattle, WA 98109",
    distance: "1.2 miles",
    rating: 4.5,
    specialFeatures: ["Affordable", "Unique Products"],
    image: require('../assets/trader-joes-logo.png'),
  },
  {
    id: 3,
    name: "Kroger",
    address: "15600 NE 8th St, Bellevue, WA 98008",
    distance: "1.5 miles",
    rating: 4.3,
    specialFeatures: ["Wide Selection", "Pharmacy"],
    image: require('../assets/kroger-logo.png'),
  },
  {
    id: 4,
    name: "Safeway",
    address: "300 Bellevue Way NE, Bellevue, WA 98004",
    distance: "2.0 miles",
    rating: 4.6,
    specialFeatures: ["Fresh Produce", "Bakery"],
    image: require('../assets/safeway-logo.png'),
  },
];

export default function StoresScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stores, setStores] = useState(STORES);
  const navigation = useNavigation<StoresScreenNavigationProp>();

  const handleSearch = () => {
    // React Native TextInput onChangeText doesn't give a form event,
    // so we handle filtering directly here or in a dedicated search button press.
    if (searchQuery.trim() === "") {
      setStores(STORES);
    } else {
      const filtered = STORES.filter((store) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setStores(filtered);
    }
  };

  // Note: Pressing Enter on keyboard might not trigger handleSearch automatically,
  // could add a search button or debounce input for better UX.

  const renderItem = ({ item }: { item: typeof STORES[0] }) => {
    // Remove postal code and 'WA' from address
    let shortAddress = item.address
      .replace(/,?\s*WA\s*\d{5}(-\d{4})?/, '') // Remove ', WA 98121' or similar
      .replace(/,?\s*WA\b/, '') // Remove ', WA' if no zip
      .replace(/,?\s*\d{5}(-\d{4})?/, ''); // Remove ', 98121' if no WA

    return (
      // Using TouchableOpacity for card-like clickable item
      <TouchableOpacity
        style={styles.storeCard}
        onPress={() => {
          // Navigate to Products screen within the nested stack
          console.log("Navigate to products for store:", item.id);
          navigation.navigate('StoreProducts', { storeId: item.id });
        }}
      >
        <View style={styles.storeCardContent}>
          <View style={styles.storeImageContainer}>
            <Image
              source={item.image || require('../assets/placeholder.png')}
              style={styles.storeImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.storeDetails}>
            <Text style={styles.storeName}>{item.name}</Text>
            <View style={styles.detailRow}>
              {/* Location icon */}
              <Ionicons name="location-outline" size={16} color="#66BB6A" style={{ marginRight: 4 }} />
              <Text style={styles.storeAddress}>{shortAddress}</Text>
            </View>
            <View style={styles.detailRow}>
              {/* Star icon */}
              <Ionicons name="star" size={16} color="#FFD700" style={{ marginRight: 4 }} />
              <Text style={styles.storeRating}>{item.rating}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.storeDistance}>{item.distance}</Text>
            </View>
            <View style={styles.specialFeaturesContainer}>
              {item.specialFeatures.map((feature) => (
                <View key={feature} style={styles.featureBadge}>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={styles.cardArrowButton}
            onPress={() => {
              navigation.navigate('StoreProducts', { storeId: item.id });
            }}
          >
            <Ionicons name="chevron-forward" size={20} color="#222" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find a Store</Text>
        <Text style={styles.headerSubText}>
          Select a store to see products that match your dietary needs
        </Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search stores..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.solidSearchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stores List */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Nearby Stores</Text>
        <FlatList
          data={stores}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[styles.listContent, { paddingHorizontal: 16 }]}
        />
    </View>

      {/* Bottom navigation is handled by App.tsx, not within this screen component */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Assuming white background
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  solidSearchButton: {
    backgroundColor: '#66BB6A',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    shadowColor: '#66BB6A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  solidSearchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden', // Needed for border radius to clip children
    borderWidth: 1,
    borderColor: '#eee', // Add a light border
    marginRight: 8,
  },
  storeCardContent: {
    flexDirection: 'row',
    padding: 16,
    gap: 12, // Use gap if supported, otherwise margin
  },
  storeImageContainer: {
    // Optional styling for image container if needed
  },
  storeImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  storeDetails: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  storeAddress: {
    fontSize: 14,
    color: '#666',
  },
  storeRating: {
    fontSize: 14,
    color: '#66BB6A', // Changed rating color to green
    fontWeight: 'bold',
  },
  separator: {
    fontSize: 14,
    marginHorizontal: 4,
    color: '#666',
  },
  storeDistance: {
    fontSize: 14,
    color: '#66BB6A', // Changed distance color to green
  },
  specialFeaturesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 4,
  },
  featureBadge: {
    backgroundColor: '#E8F5E9', // Changed feature badge background to light green
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#66BB6A', // Changed feature text color to green
    fontWeight: '500',
  },
  cardArrowButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    padding: 2,
  },
});