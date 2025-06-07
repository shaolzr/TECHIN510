import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
// Ensure you have installed vector icons: npx expo install @expo/vector-icons
import { MaterialIcons } from '@expo/vector-icons'; // Using MaterialIcons as an example

// --- Reusing Placeholder Components ---

const Label = ({ children, style }) => (
  <Text style={[styles.label, style]}>{children}</Text>
);

// Basic Switch placeholder (functional)
const Switch = ({ value, onValueChange }) => (
  <TouchableOpacity
    style={[styles.switchContainer, value ? styles.switchOn : styles.switchOff]}
    onPress={() => onValueChange(!value)}
  >
    <View style={[styles.switchToggle, value ? styles.switchToggleOn : styles.switchToggleOff]} />
  </TouchableOpacity>
);

// Basic Button placeholder - Modified to ensure text children are in Text components
const Button = ({ children, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
    {/* Ensure all children are wrapped in Text if they are strings */}
    {React.Children.map(children, child =>
      typeof child === 'string' ? <Text style={styles.buttonContentText}>{child}</Text> : child
    )}
  </TouchableOpacity>
);

// --- End Reusing Placeholder Components ---


export default function ProfileScreen({ navigation }) { // Assuming using React Navigation
  // Dietary preferences states
  const [hasAllergies, setHasAllergies] = useState(false);
  const [isDiabeticFriendly, setIsDiabeticFriendly] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const handleSavePreferences = () => {
    // Save user preferences
    console.log("Saved dietary preferences:", {
      hasAllergies,
      isDiabeticFriendly,
      isGlutenFree,
      isVegan,
      isVegetarian,
    });
    // TODO: Implement actual saving logic (e.g., API call)
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          {/* Removed Back button as requested */}
          <Text style={styles.headerTitle}>Manage your dietary preferences</Text>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>Your preferences help us find suitable products for you</Text>
          </View>

          {/* Dietary Preferences Section */}
          <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Dietary Preferences</Text>

              <View style={styles.preferenceItem}>
                <Label>Allergies</Label>
                <Switch value={hasAllergies} onValueChange={setHasAllergies} />
              </View>

              <View style={styles.preferenceItem}>
                <Label>Diabetic-Friendly</Label>
                <Switch value={isDiabeticFriendly} onValueChange={setIsDiabeticFriendly} />
              </View>

              <View style={styles.preferenceItem}>
                <Label>Gluten-Free</Label>
                <Switch value={isGlutenFree} onValueChange={setIsGlutenFree} />
              </View>

              <View style={styles.preferenceItem}>
                <Label>Vegan</Label>
                <Switch value={isVegan} onValueChange={setIsVegan} />
              </View>

              <View style={styles.preferenceItem}>
                <Label>Vegetarian</Label>
                <Switch value={isVegetarian} onValueChange={setIsVegetarian} />
              </View>
          </View>


          {/* Save Button */}
          <Button onPress={handleSavePreferences} style={styles.saveButton}>
               {/* Using MaterialIcons as an example */}
              <MaterialIcons name="save" size={20} color="#fff" style={styles.saveIcon} />
              <Text style={styles.buttonText}>Save Preferences</Text>
          </Button>
        </View>

      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // Corresponds to border-b
    padding: 16, // Corresponds to p-4
    flexDirection: 'row',
    alignItems: 'center',
    // No need for justify-content: 'space-between' since the back button is removed
     justifyContent: 'center', // Center content if no other items
  },
   // Removed backButton and backIcon styles
   backButtonText: {
    fontSize: 14, // Corresponds to text-sm
    color: '#6b7280', // Corresponds to text-muted-foreground
    // This style is now only used if the back button text is placed elsewhere
   },
  headerTitle: {
    fontSize: 20, // Corresponds to text-xl
    fontWeight: 'bold', // Corresponds to font-bold
    // Keep absolute positioning to ensure centering regardless of padding/margins
     position: 'absolute',
     left: 0,
     right: 0,
     textAlign: 'center',
     zIndex: -1,
  },
   mainContent: {
    flex: 1,
    padding: 16, // Corresponds to p-4
    width: '100%', // Corresponds to w-full
    maxWidth: 448, // Corresponds to max-w-md
    alignSelf: 'center', // Center the content block
   },
   infoTextContainer: {
     marginBottom: 24, // space below
   },
   infoText: {
     color: '#6b7280', // Corresponds to text-muted-foreground
     textAlign: 'center', // text-center
   },
   sectionContainer: {
       marginBottom: 24, // space below the section
   },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16, // space below title
    },
   preferenceItem: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
     marginBottom: 16, // space between items
   },
   label: {
     fontSize: 16,
     flex: 1, // Allow label to take available space
     marginRight: 10, // Space between label and switch
   },
    switchContainer: {
        width: 50, // Adjust size as needed
        height: 30, // Adjust size as needed
        borderRadius: 15, // Make it pill-shaped
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    switchOn: {
        backgroundColor: 'green', // Active color
    },
    switchOff: {
        backgroundColor: '#e5e7eb', // Inactive color
    },
    switchToggle: {
        width: 26, // Adjust size
        height: 26, // Adjust size
        borderRadius: 13, // Make it round
        backgroundColor: '#fff', // Toggle color
    },
    switchToggleOn: {
        alignSelf: 'flex-end', // Move to the right when on
    },
    switchToggleOff: {
        alignSelf: 'flex-start', // Move to the left when off
    },
   saveButton: {
     width: '100%', // w-full
     marginTop: 24, // Space above the button
     backgroundColor: '#1f2937', // Dark background for button
     paddingVertical: 16, // size="lg" like padding
     paddingHorizontal: 24, // size="lg" like padding
     borderRadius: 8, // Rounded corners
     alignItems: 'center',
     justifyContent: 'center',
     flexDirection: 'row', // For icon and text
   },
    // Style for text inside the Button placeholder
   buttonContentText: {
        fontSize: 18, // Example size
        color: '#fff', // Example color
        fontWeight: '500',
   },
   buttonText: { // This style is for the explicit Text component used for "Save Preferences"
     fontSize: 18, // size="lg" often implies larger text
     color: '#fff', // White text
     fontWeight: '500',
   },
   saveIcon: {
     marginRight: 8, // Corresponds to mr-2
   },
});