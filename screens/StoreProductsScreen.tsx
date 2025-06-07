import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Modal, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons as you have it in App.tsx
import Checkbox from 'expo-checkbox'; // Using expo-checkbox
import { useRoute } from '@react-navigation/native'; // To access route params like storeId

// Mock product data (replace with actual data fetching logic later)
const PRODUCTS = [
  {
    id: 1,
    name: "Organic Almond Milk",
    price: 4.99,
    image: require('../assets/almond-milk-pouring.png'),
    tags: ["Dairy-Free", "Vegan", "Low Sugar"],
    suitable: true,
  },
  {
    id: 2,
    name: "Gluten-Free Bread",
    price: 5.49,
    image: require('../assets/gluten-free-bread.png'),
    tags: ["Gluten-Free", "Vegan", "No Preservatives"],
    suitable: true,
  },
  {
    id: 3,
    name: "Sugar-Free Dark Chocolate",
    price: 3.99,
    image: require('../assets/sugar-free-dark-chocolate.png'),
    tags: ["No Added Sugar", "Vegan", "Gluten-Free"],
    suitable: true,
  },
  {
    id: 4,
    name: "Organic Mixed Berries",
    price: 6.99,
    image: require('../assets/organic-mixed-berries.png'),
    tags: ["Low GI", "Organic", "Fresh"],
    suitable: true,
  },
  {
    id: 5,
    name: "Whole Grain Pasta",
    price: 2.99,
    image: require('../assets/placeholder.png'),
    tags: ["High Fiber", "Low GI", "Vegan"],
    suitable: false,
    warning: "Contains Gluten",
  },
  {
    id: 6,
    name: "Greek Yogurt",
    price: 4.49,
    image: require('../assets/greek-yogurt-bowl.png'),
    tags: ["High Protein", "Probiotic", "Low Sugar"],
    suitable: false,
    warning: "Contains Dairy",
  },
];

// Helper function to simulate fetching products for a specific store
// Currently just returns all products as mock data doesn't have store info
const fetchProductsByStore = (storeId: number) => {
    console.log(`Fetching products for store ID: ${storeId}`);
    // In a real app, you would fetch data based on storeId from your backend
    return PRODUCTS;
};


const StoreProductsScreen = () => {
  const route = useRoute();
  // Access the storeId parameter passed during navigation
  const { storeId } = route.params as { storeId: number };


  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(PRODUCTS); // Initialize with all products
  const [filters, setFilters] = useState({
    suitableOnly: false,
    categories: { // Categories from original code were not used in filtering logic, keeping for potential future use
      dairy: false,
      bakery: false,
      produce: false,
      pantry: false,
    },
    dietary: {
      vegan: false,
      glutenFree: false,
      lowSugar: false,
      organic: false,
    },
  });
  const [cart, setCart] = useState<number[]>([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  // Fetch products when the screen loads or storeId changes (if using a real backend)
  useEffect(() => {
    const initialProducts = fetchProductsByStore(storeId);
    setProducts(initialProducts);
  }, [storeId]); // Re-run if storeId changes


  const filterProducts = () => {
    // Start filtering from the products fetched for the store (or all products with mock data)
    let filtered = fetchProductsByStore(storeId); // Use the initial set of products

    // Apply search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply suitable only filter
    if (filters.suitableOnly) {
      filtered = filtered.filter((product) => product.suitable);
    }

    // Apply dietary filters
    const activeDietaryFilters = Object.entries(filters.dietary).filter(([_, value]) => value);
    if (activeDietaryFilters.length > 0) {
      filtered = filtered.filter((product) =>
        activeDietaryFilters.some(([key]) => {
          const tag =
            key === "glutenFree"
              ? "Gluten-Free"
              : key === "lowSugar"
                ? "Low Sugar"
                : key === "vegan"
                  ? "Vegan"
                  : "Organic"; // Assuming 'organic' is the only other possibility based on original code
          return product.tags.includes(tag);
        })
      );
    }

    setProducts(filtered);
    setFilterModalVisible(false); // Close modal after applying filters
  };

  const handleFilterChange = (category: "categories" | "dietary", key: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key as keyof typeof prev[typeof category]],
      },
    }));
  };

  const toggleSuitableOnly = () => {
    setFilters((prev) => ({
      ...prev,
      suitableOnly: !prev.suitableOnly,
    }));
  };

  const toggleCartItem = (productId: number) => {
    setCart((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Reset filters and show all products
  const resetFilters = () => {
    setFilters({
        suitableOnly: false,
        categories: {
          dairy: false, bakery: false, produce: false, pantry: false,
        },
        dietary: {
          vegan: false, glutenFree: false, lowSugar: false, organic: false,
        },
    });
    setSearchQuery(""); // Also clear search query on reset
    // Re-fetch initial products and then apply empty filters (which shows all)
    const initialProducts = fetchProductsByStore(storeId);
    setProducts(initialProducts); // Reset to the initial set for the store
    setFilterModalVisible(false);
  };


  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Store Products</Text>
            {/* You might want to display the store name here based on storeId */}
            <Text style={styles.headerSubtitle}>Browse available products at this store</Text>
        </View>

        <View style={styles.searchFilterContainer}>
            <View style={styles.searchInputContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search products..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={filterProducts} // Apply filter on search submit
                    returnKeyType="search"
                />
                <TouchableOpacity onPress={filterProducts} style={styles.searchButton}>
                    <Ionicons name="search" size={20} color="#888" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={styles.filterButton}>
                <Ionicons name="filter" size={20} color="#000" />
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.productList}>
            {products.map((product) => (
                <View key={product.id} style={[styles.productCard, !product.suitable && styles.productCardWarning]}>
                    <View style={styles.productCardContent}>
                        <View style={styles.productImageContainer}>
                            <Image
                                source={product.image}
                                style={styles.productImage}
                                resizeMode="cover"
                            />
                             {!product.suitable && (
                                <View style={styles.warningBadge}>
                                    <Text style={styles.warningBadgeText}>Warning</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                            <View style={styles.tagsContainer}>
                                {product.tags.map((tag) => (
                                    <View
                                        key={tag}
                                        style={[
                                            styles.tagBadge,
                                            (tag.includes("Free") || tag.includes("Low") || tag === "Vegan" || tag === "Organic") && styles.dietaryTagGreen
                                        ]}
                                    >
                                        <Text style={styles.tagBadgeText}>{tag}</Text>
                                    </View>
                                ))}
                            </View>
                            {!product.suitable && <Text style={styles.warningText}>{product.warning}</Text>}
                        </View>
                        <TouchableOpacity
                            style={[styles.addToCartButton, cart.includes(product.id) && styles.addToCartButtonActive]}
                            onPress={() => toggleCartItem(product.id)}
                            // Consider adding an accessibilityLabel here
                        >
                            {cart.includes(product.id) ? (
                                <Ionicons name="checkmark" size={20} color="#fff" />
                            ) : (
                                <Ionicons name="add" size={20} color="#000" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

             {products.length === 0 && (
                <View style={styles.noProductsMessage}>
                    <Text style={styles.noProductsMessageText}>
                        No products match your search criteria. Try adjusting your filters.
                    </Text>
                </View>
            )}
        </ScrollView>

        {/* Filter Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={isFilterModalVisible}
            onRequestClose={() => setFilterModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Filter Products</Text>
                        <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                            <Ionicons name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={[styles.modalBody, { paddingHorizontal: 16 }]}>
                         <View style={styles.filterSection}>
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    value={filters.suitableOnly}
                                    onValueChange={toggleSuitableOnly}
                                />
                                <Text style={styles.checkboxLabel}>Show only suitable products</Text>
                            </View>
                        </View>

                         {/* Categories Section (from original code, but not used in filtering) */}
                         {/* <View style={styles.filterSection}>
                             <Text style={styles.filterSectionTitle}>Categories</Text>
                             {Object.keys(filters.categories).map(key => (
                                 <View key={key} style={styles.checkboxContainer}>
                                     <Checkbox
                                         value={filters.categories[key as keyof typeof filters.categories]}
                                         onValueChange={() => handleFilterChange('categories', key)}
                                     />
                                     <Text style={styles.checkboxLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                                 </View>
                             ))}
                         </View>
                         <View style={styles.separator} /> */}


                        <View style={styles.separator} />


                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Dietary Preferences</Text>
                            {Object.keys(filters.dietary).map(key => (
                                <View key={key} style={styles.checkboxContainer}>
                                     <Checkbox
                                         value={filters.dietary[key as keyof typeof filters.dietary]}
                                         onValueChange={() => handleFilterChange('dietary', key)}
                                     />
                                     <Text style={styles.checkboxLabel}>
                                        {key === 'glutenFree' ? 'Gluten-Free' : key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Text>
                                </View>
                             ))}
                        </View>

                    </ScrollView>
                    <View style={styles.modalFooter}>
                         <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
                            <Text style={styles.resetButtonText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.applyButton} onPress={filterProducts}>
                            <Text style={styles.applyButtonText}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

        {/* TODO: Implement Bottom Navigation equivalent in React Native if needed */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Match white background
    paddingTop: 32,
    paddingHorizontal: 16,
  },
   header: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666', // Muted foreground color
    marginTop: 4,
  },
   searchFilterContainer: {
    flexDirection: 'row',
    gap: 8, // gap-2
    marginTop: 16, // mt-4
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchInputContainer: {
    flex: 1, // flex-1
    flexDirection: 'row',
    gap: 8, // flex gap-2
    alignItems: 'center',
     borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
     paddingHorizontal: 8,
    marginRight: 4, // Add some margin to the right of the search input container
  },
  searchInput: {
    flex: 1, // flex-1
    height: 40, // Approximate height
  },
  searchButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 4,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productList: {
    marginTop: 24, // mt-6
  },
  productCard: {
    backgroundColor: '#fff', // white background
    borderRadius: 8,
    marginBottom: 16, // space-y-4
    marginHorizontal: 16,
    elevation: 2, // shadow-md
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, // make shadow lighter
    shadowRadius: 2, // slightly adjust radius
    borderWidth: 1, // Add border
    borderColor: '#eee', // Light grey border
  },
   productCardWarning: {
      borderColor: '#fecaca', // border-red-200
   },
  productCardContent: {
    padding: 16, // p-4
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // gap-3
  },
   productImageContainer: {
       position: 'relative',
   },
  productImage: {
    width: 80, // w-20
    height: 80, // h-20
    objectFit: 'cover', // object-cover
    borderRadius: 6, // rounded-md
  },
  warningBadge: {
      position: 'absolute',
      top: -8, // -top-2 * 4 (assuming 1 unit = 4px)
      right: -8, // -right-2 * 4
      backgroundColor: '#dc3545', // destructive variant
      borderRadius: 12, // pill shape approximate
      paddingHorizontal: 6,
      paddingVertical: 2,
  },
  warningBadgeText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
  },
  productInfo: {
    flex: 1, // flex-1
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold', // font-medium equivalent
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff', // primary color
    marginTop: 2,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4, // gap-1
    marginTop: 4, // mt-1
  },
  tagBadge: {
    borderWidth: 1,
    borderColor: '#ccc', // outline variant color
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
   dietaryTagGreen: {
       borderColor: '#28a745', // green color for dietary tags
   },
  tagBadgeText: {
    fontSize: 10, // text-xs
  },
  warningText: {
      fontSize: 12, // text-xs
      color: '#dc3545', // text-red-500
      marginTop: 4, // mt-1
  },
  addToCartButton: {
    width: 32, // h-8 w-8
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc', // outline variant
    borderRadius: 4,
  },
  addToCartButtonActive: {
      backgroundColor: '#007bff', // default variant color
      borderColor: '#007bff',
  },
  noProductsMessage: {
      textAlign: 'center', // text-center
      paddingVertical: 32, // py-8
  },
  noProductsMessageText: {
      fontSize: 16,
      color: '#666', // muted-foreground
  },
    // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
    justifyContent: 'flex-end', // Align to bottom
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%', // Full width
    height: '80%', // 80% of screen height, sm:w-[340px] is complex to translate directly
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBody: {
    flex: 1, // Take remaining space
  },
  filterSection: {
    marginBottom: 16,
  },
   filterSectionTitle: {
       fontSize: 16,
       fontWeight: 'bold', // font-medium
       marginBottom: 8, // mb-2
   },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // space-y-2 gap
  },
  checkboxLabel: {
    marginLeft: 8, // space-x-2 gap
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee', // my-4 equivalent
    marginVertical: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16, // mt-6
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1, // Take half space
    marginRight: 8,
    alignItems: 'center',
  },
   resetButtonText: {
       fontSize: 16,
   },
  applyButton: {
    backgroundColor: '#007bff', // Blue color for apply button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    flex: 1, // Take half space
    marginLeft: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default StoreProductsScreen;