import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  ScrollView,
  SafeAreaView,
} from "react-native";

// Mock product data
const PRODUCTS = [
  {
    id: 1,
    name: "Organic Almond Milk",
    price: 4.99,
    image: require("../assets/almond-milk-pouring.png"),
    tags: ["Dairy-Free", "Vegan", "Low Sugar"],
    suitable: true,
  },
  {
    id: 2,
    name: "Gluten-Free Bread",
    price: 5.49,
    image: require("../assets/gluten-free-bread.png"),
    tags: ["Gluten-Free", "Vegan", "No Preservatives"],
    suitable: true,
  },
  {
    id: 3,
    name: "Sugar-Free Dark Chocolate",
    price: 3.99,
    image: require("../assets/sugar-free-dark-chocolate.png"),
    tags: ["No Added Sugar", "Vegan", "Gluten-Free"],
    suitable: true,
  },
  {
    id: 4,
    name: "Organic Mixed Berries",
    price: 6.99,
    image: require("../assets/organic-mixed-berries.png"),
    tags: ["Low GI", "Organic", "Fresh"],
    suitable: true,
  },
  {
    id: 5,
    name: "Whole Grain Pasta",
    price: 2.99,
    image: require("../assets/placeholder.png"),
    tags: ["High Fiber", "Low GI", "Vegan"],
    suitable: false,
    warning: "Contains Gluten",
  },
  {
    id: 6,
    name: "Greek Yogurt",
    price: 4.49,
    image: require("../assets/greek-yogurt-bowl.png"),
    tags: ["High Protein", "Probiotic", "Low Sugar"],
    suitable: false,
    warning: "Contains Dairy",
  },
];

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(PRODUCTS);
  const [filters, setFilters] = useState({
    suitableOnly: false,
    dietary: {
      vegan: false,
      glutenFree: false,
      lowSugar: false,
      organic: false,
    },
  });
  const [cart, setCart] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filterProducts = () => {
    let filtered = PRODUCTS;

    // Search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Suitable only
    if (filters.suitableOnly) {
      filtered = filtered.filter((product) => product.suitable);
    }

    // Dietary filters
    const activeDietaryFilters = Object.entries(filters.dietary).filter(
      ([, value]) => value
    );
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
              : "Organic";
          return product.tags.includes(tag);
        })
      );
    }

    setProducts(filtered);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setTimeout(filterProducts, 0);
  };

  const toggleDietary = (key: string) => {
    setFilters((prev) => {
      const updated = {
        ...prev,
        dietary: {
          ...prev.dietary,
          [key]: !prev.dietary[key as keyof typeof prev.dietary],
        },
      };
      setTimeout(filterProducts, 0);
      return updated;
    });
  };

  const toggleSuitableOnly = () => {
    setFilters((prev) => {
      const updated = { ...prev, suitableOnly: !prev.suitableOnly };
      setTimeout(filterProducts, 0);
      return updated;
    });
  };

  const toggleCartItem = (productId: number) => {
    setCart((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const renderProduct = ({ item }: { item: typeof PRODUCTS[0] }) => (
    <View style={[styles.card, !item.suitable && styles.cardWarning]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={item.image}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 4 }}>
            {item.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          {!item.suitable && (
            <Text style={styles.warningText}>{item.warning}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => toggleCartItem(item.id)}
          style={[
            styles.addButton,
            cart.includes(item.id) && styles.addedButton,
          ]}
        >
          <Text style={{ color: "#fff" }}>
            {cart.includes(item.id) ? "✓" : "+"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Store Products</Text>
      <Text style={styles.subHeader}>
        Browse available products at this store
      </Text>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters((v) => !v)}
        >
          <Text style={{ color: "#333" }}>Filter</Text>
        </TouchableOpacity>
      </View>
      {showFilters && (
        <ScrollView style={styles.filterPanel}>
          <View style={styles.filterRow}>
            <Text>Show only suitable products</Text>
            <Switch
              value={filters.suitableOnly}
              onValueChange={toggleSuitableOnly}
            />
          </View>
          <Text style={styles.filterTitle}>Dietary Preferences</Text>
          {Object.entries(filters.dietary).map(([key, value]) => (
            <View style={styles.filterRow} key={key}>
              <Text>
                {key === "vegan"
                  ? "Vegan"
                  : key === "glutenFree"
                  ? "Gluten-Free"
                  : key === "lowSugar"
                  ? "Low Sugar"
                  : "Organic"}
              </Text>
              <Switch value={value} onValueChange={() => toggleDietary(key)} />
            </View>
          ))}
        </ScrollView>
      )}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 4 },
  subHeader: { color: "#888", marginBottom: 12 },
  searchRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    backgroundColor: "#fafafa",
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  filterPanel: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  filterTitle: { fontWeight: "bold", marginTop: 8, marginBottom: 4 },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardWarning: {
    borderColor: "#f99",
    borderWidth: 1,
  },
  productImage: { width: 64, height: 64, borderRadius: 8 },
  productName: { fontWeight: "bold", fontSize: 16 },
  productPrice: { color: "#66BB6A", fontWeight: "bold", marginTop: 2 },
  tag: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginTop: 2,
  },
  tagText: { fontSize: 12, color: "#66BB6A" },
  warningText: { color: "#d32f2f", fontSize: 12, marginTop: 4 },
  addButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  addedButton: {
    backgroundColor: "#888",
  },
});
