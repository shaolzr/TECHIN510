import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView, Alert, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';

// Define types for navigation
type RootTabParamList = {
  Products: undefined;
  Cart: undefined;
  Scanner: undefined;
  Stores: undefined;
};

type ScannerScreenNavigationProp = any; // Use 'any' or define properly if needed later

// Mock detected products (migrate from Next.js)
const DETECTED_PRODUCTS = [
  {
    id: 1,
    name: "Organic Almond Milk",
    price: 4.99,
    image: require('../assets/almond-milk-pouring.png'), // Corrected path
    tags: ["Dairy-Free", "Vegan", "Low Sugar"],
    suitable: true,
    position: { top: "15%", left: "20%", width: "25%", height: "30%" }
  },
  {
    id: 2,
    name: "Whole Wheat Bread",
    price: 3.49,
    image: require('../assets/gluten-free-bread.png'), // Corrected path
    tags: ["Whole Grain", "High Fiber"],
    suitable: false,
    warning: "Contains Gluten",
    position: { top: "50%", left: "60%", width: "30%", height: "25%" }
  },
  {
    id: 3,
    name: "Organic Bananas",
    price: 1.99,
    image: require('../assets/organic-mixed-berries.png'),
    tags: ["Fresh", "Organic", "Low GI"],
    suitable: true,
    position: { top: "60%", left: "10%", width: "20%", height: "20%" }
  },
];

export default function ScannerScreen() {
  const [selectedProduct, setSelectedProduct] = useState<typeof DETECTED_PRODUCTS[0] | null>(null);
  const navigation = useNavigation<ScannerScreenNavigationProp>();
  const [permission, requestPermission] = useCameraPermissions();

  // Handle permission request logic
  if (!permission) {
    // Camera permissions are still loading
    return <View style={styles.permissionContainer}><Text>Requesting for camera permission...</Text></View>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.permissionContainer}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Note: Actual product detection logic is still a placeholder.
  // This code integrates the camera feed and permission handling.

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Scanner</Text>
        <TouchableOpacity style={styles.switchCameraButton}>
          {/* Using text for icon */} <Text style={styles.iconText}>📷</Text>
          <Text style={styles.switchButtonText}>Switch Camera</Text>
        </TouchableOpacity>
      </View>

      {/* Camera Feed */}
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing='back'>
          {DETECTED_PRODUCTS.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.productHighlight,
                product.suitable ? styles.productHighlightSuitable : styles.productHighlightUnsuitable,
                { top: product.position.top, left: product.position.left, width: product.position.width, height: product.position.height }
              ]}
              onPress={() => setSelectedProduct(product)}
            >
              <View
                style={[
                  styles.productHighlightTag,
                  product.suitable ? styles.productHighlightTagSuitable : styles.productHighlightTagUnsuitable,
                ]}
              >
                <Text style={styles.productHighlightTagText}>
                  {product.suitable ? "Suitable" : "Contains Allergen"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </CameraView>
      </View>

      {/* Scanning Instructions Card */}
      <View style={styles.instructionsCard}>
        <View style={styles.instructionsContent}>
          <View>
            <Text style={styles.instructionsTitle}>Scanning for Products</Text>
            <Text style={styles.instructionsSubText}>Tap on highlighted items to see details</Text>
          </View>
          <TouchableOpacity onPress={() => Alert.alert("How to Use Scanner", "Point your camera at grocery products to scan them. Green highlights are suitable, red highlights contain allergens. Tap to see details.")}>
            {/* Using text for icon */} <Text style={styles.infoIcon}>ℹ️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Detail Modal */}
      <Modal
        visible={selectedProduct !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedProduct(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
              <TouchableOpacity onPress={() => setSelectedProduct(null)} style={styles.closeButton}>
                {/* Using text for icon */} <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {selectedProduct && (
                <View style={styles.productDetailContainer}>
                  <Image
                    source={selectedProduct.image || require('../assets/placeholder.png')}
                    style={styles.productDetailImage}
                    resizeMode="cover"
                  />
                  <View style={styles.productDetailTextContent}>
                    <Text style={styles.productDetailPrice}>${selectedProduct.price.toFixed(2)}</Text>
                    <View style={styles.productDetailTagsContainer}>
                      {selectedProduct.tags.map((tag) => (
                        <View key={tag} style={styles.productDetailTagBadge}>
                          <Text style={styles.productDetailTagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                    {!selectedProduct.suitable && (
                      <Text style={styles.productDetailWarning}>{selectedProduct.warning}</Text>
                    )}
                  </View>
                </View>
              )}
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.addToCartButtonText}>Add to Shopping List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom navigation is handled by App.tsx, not within this screen component */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchCameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  switchButtonText: {
    marginLeft: 4,
    color: '#66BB6A',
  },
  iconText: {
    fontSize: 18,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cameraPlaceholder: {
    width: '100%',
    height: '70%',
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraPlaceholderContent: {
    textAlign: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 48,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 8,
  },
  cameraText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
  },
  cameraSubText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginTop: 4,
  },
  productHighlight: {
    position: 'absolute',
    borderWidth: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 4,
  },
  productHighlightSuitable: {
    borderColor: '#66BB6A',
  },
  productHighlightUnsuitable: {
    borderColor: 'red',
  },
  productHighlightTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  productHighlightTagSuitable: {
    backgroundColor: '#66BB6A',
  },
  productHighlightTagUnsuitable: {
    backgroundColor: 'red',
  },
  productHighlightTagText: {
    color: '#66BB6A',
    fontSize: 10,
    fontWeight: 'bold',
  },
  instructionsCard: {
    margin: 16,
    marginTop: -24,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  instructionsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  instructionsSubText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  infoIcon: {
    fontSize: 20,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  modalBody: {
  },
  productDetailContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  productDetailImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  productDetailTextContent: {
    flex: 1,
  },
  productDetailPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#66BB6A',
    marginBottom: 8,
  },
  productDetailTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
  },
  productDetailTagBadge: {
    backgroundColor: '#E8F5E9',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
  productDetailTagText: {
    fontSize: 12,
    color: '#66BB6A',
  },
  productDetailWarning: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
  modalFooter: {
    marginTop: 16,
  },
  addToCartButton: {
    backgroundColor: '#66BB6A',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});