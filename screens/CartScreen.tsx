import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Define types for navigation
type RootTabParamList = {
  Products: undefined;
  Cart: undefined;
  Scanner: undefined;
  Stores: undefined;
};

type CartScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Cart'>;

// Mock shopping list data (migrate from Next.js)
const INITIAL_SHOPPING_LIST = [
  {
    id: 1,
    name: "Organic Almond Milk",
    price: 4.99,
    image: require('../assets/almond-milk-pouring.png'),
    tags: ["Dairy-Free", "Vegan"],
    quantity: 1,
    checked: false,
  },
  {
    id: 2,
    name: "Gluten-Free Bread",
    price: 5.49,
    image: require('../assets/gluten-free-bread.png'),
    tags: ["Gluten-Free", "Vegan"],
    quantity: 2,
    checked: false,
  },
  {
    id: 3,
    name: "Sugar-Free Dark Chocolate",
    price: 3.99,
    image: require('../assets/sugar-free-dark-chocolate.png'),
    tags: ["No Added Sugar", "Vegan"],
    quantity: 1,
    checked: true,
  },
  {
    id: 4,
    name: "Organic Mixed Berries",
    price: 6.99,
    image: require('../assets/organic-mixed-berries.png'),
    tags: ["Low GI", "Organic"],
    quantity: 1,
    checked: false,
  },
];

export default function CartScreen() {
  const [shoppingList, setShoppingList] = useState(INITIAL_SHOPPING_LIST);
  const navigation = useNavigation<CartScreenNavigationProp>();

  const toggleChecked = (id: number) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const removeItem = (id: number) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCheckedItems = () => {
    setShoppingList((prev) => prev.filter((item) => !item.checked));
  };

  const checkedCount = shoppingList.filter((item) => item.checked).length;
  const totalItems = shoppingList.length;

  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.itemContainer, item.checked && styles.itemChecked]}>
      <TouchableOpacity
        style={[styles.checkbox, item.checked && styles.checkboxChecked]}
        onPress={() => toggleChecked(item.id)}
      >
        {item.checked && <Text style={styles.checkIcon}>✓</Text>}
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          source={item.image || require('../assets/placeholder.png')}
          style={[styles.itemImage, item.checked && styles.imageChecked]}
          resizeMode="cover"
        />
        {item.quantity > 1 && (
          <View style={styles.quantityBadge}>
            <Text style={styles.quantityText}>x{item.quantity}</Text>
          </View>
        )}
      </View>
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, item.checked && styles.itemNameChecked]}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.tagsContainer}>
          {item.tags.map((tag: string) => (
            <View key={tag} style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping List</Text>
        <View style={styles.headerInfo}>
          <Text style={styles.headerSubText}>
            {checkedCount} of {totalItems} items purchased
          </Text>
          {checkedCount > 0 && (
            <TouchableOpacity onPress={clearCheckedItems}>
              <Text style={styles.clearButtonText}>Clear purchased items</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[styles.listContent, { paddingHorizontal: 16 }]}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateIcon}>🛍️</Text>
          <Text style={styles.emptyStateTitle}>Your shopping list is empty</Text>
          <Text style={styles.emptyStateText}>Add products from the store to create your shopping list</Text>
          <TouchableOpacity onPress={() => navigation.navigate('StoreProducts', { storeId: 1 })}>
            <Text style={styles.browseButtonText}>Browse Products <Text style={styles.browseButtonArrow}>→</Text></Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Assuming a white background
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Light grey border
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  headerSubText: {
    fontSize: 14,
    color: '#666', // Muted grey
  },
  clearButtonText: {
    fontSize: 14,
    color: '#007AFF', // Example blue color for links/buttons
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Light grey border
  },
  itemChecked: {
    backgroundColor: '#f0f0f0', // Light grey background for checked items
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc', // Grey border
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#66BB6A', // Changed checked checkbox background to green
    borderColor: '#66BB6A', // Changed checked checkbox border to green
  },
  checkIcon: {
    color: '#fff', // Changed check icon color to white
    fontSize: 16,
    lineHeight: 20, // Adjust line height if needed for centering
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 4,
  },
  imageChecked: {
    opacity: 0.6,
  },
  quantityBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#66BB6A', // Changed quantity badge background to green
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  quantityText: {
    color: '#fff', // Changed quantity text color to white
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
  },
  itemPrice: { color: '#66BB6A' }, // Changed price color to green
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    gap: 4, // Use gap for spacing if supported, otherwise margin
  },
  tagBadge: {
    backgroundColor: '#E8F5E9', // Changed tag background to light green
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 12,
    color: '#66BB6A', // Changed tag text color to green
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 18,
    color: '#666', // Muted grey
  },
  listContent: {
    paddingBottom: 20, // Add some padding at the bottom
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
    textAlign: 'center', // This style doesn't apply to View, but its children can inherit
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
    color: '#ccc', // Muted grey
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666', // Muted grey
    marginBottom: 24,
    textAlign: 'center',
  },
  browseButtonText: {
    color: '#66BB6A', // Changed browse button text color to green
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  browseButtonArrow: {
    color: '#66BB6A', // Changed browse button arrow color to green
    fontSize: 16,
    marginLeft: 8,
  },
});