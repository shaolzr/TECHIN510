import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import your screen components
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import ScannerScreen from './screens/ScannerScreen';
import StoresScreen from './screens/StoresScreen';
import ProfileScreen from './screens/ProfileScreen';
import StoreProductsScreen from './screens/StoreProductsScreen';

const BottomTab = createBottomTabNavigator();
const StoresStack = createStackNavigator();

// Define the Stack Navigator for the Stores tab
function StoresStackScreen() {
  return (
    <StoresStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StoresStack.Screen
        name="FindStores"
        component={StoresScreen}
      />
      <StoresStack.Screen
        name="StoreProducts"
        component={StoreProductsScreen}
      />
    </StoresStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;
            const iconSize = 25;

            if (route.name === 'Stores') {
              iconName = focused ? 'location' : 'location-outline';
            } else if (route.name === 'Scanner') {
              iconName = focused ? 'scan' : 'scan-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            const iconColor = focused ? 'green' : 'gray';

            return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
             fontSize: 12,
             marginBottom: 4,
          },
          tabBarStyle: {
             height: 60,
             paddingBottom: 5,
             backgroundColor: '#fff',
          },
          headerShown: false,
        })}
      >
        <BottomTab.Screen name="Stores" component={StoresStackScreen} />
        <BottomTab.Screen name="Scanner" component={ScannerScreen} />
        <BottomTab.Screen name="Cart" component={CartScreen} />
        <BottomTab.Screen name="Profile" component={ProfileScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
