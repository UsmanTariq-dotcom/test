import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Animated } from 'react-native';
import React, { useState } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { smartWatch } from '../data/smartwatch';
import { headphone } from '../data/headphones';
import { RootStackParamList } from '../navigation.tsx/types';
import ProductCarousel from '../components/ProductCarousel';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Get the route type for the 'Details' screen
type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

const ProductDetailsScreen = () => {
  const route = useRoute<DetailsRouteProp>();
  const { productId } = route.params;
  const navigation = useNavigation();

  // Tab state to track the selected tab (description or review)
  const [selectedTab, setSelectedTab] = useState<'description' | 'review'>('description');

  // Animation state for the Add to Cart button
  const [buttonScale] = useState(new Animated.Value(1));

  // Assuming the data is available in smartWatch and headphone
  const product = [...smartWatch, ...headphone].find(p => p.id === productId);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  // Function to animate the Add to Cart button when pressed
  const handleAddToCartPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    // Add logic to handle adding the product to the cart
  };

  return (
    <View style={styles.container}>
      {/* Custom header with back button and heart icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <AntDesign name="hearto" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ProductCarousel images={product.images} />

        {/* Title and Rating Wrapper */}
        <View style={styles.titleRatingWrapper}>
          {/* Title and Brand */}
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.brand}>{product.brand}</Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingWrapper}>
            <AntDesign name="star" color="orange" size={20} style={styles.starStyle} />
            <Text style={styles.rating}>4.5</Text>
          </View>
        </View>

        {/* Color container */}
        <View style={styles.colorContainer}>
          <Text style={styles.setcolor}>Colors</Text>
          <View style={styles.parentstylecolorcontainer}>
            <View style={styles.colorOptionWrapper}>
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: 'silver' }]} />
              <Text style={styles.colorName}>Silver</Text>
            </View>
            <View style={styles.colorOptionWrapper}>
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: 'orange' }]} />
              <Text style={styles.colorName}>Orange</Text>
            </View>
            <View style={styles.colorOptionWrapper}>
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: 'pink' }]} />
              <Text style={styles.colorName}>Pink</Text>
            </View>
          </View>
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'description' && styles.activeTab]}
            onPress={() => setSelectedTab('description')}
          >
            <Text style={[styles.tabText, selectedTab === 'description' && styles.activeTabText]}>Description</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'review' && styles.activeTab]}
            onPress={() => setSelectedTab('review')}
          >
            <Text style={[styles.tabText, selectedTab === 'review' && styles.activeTabText]}>Review</Text>
          </TouchableOpacity>
        </View>

        {/* Conditional rendering of content based on the selected tab */}
        {selectedTab === 'description' ? (
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.details}</Text>
          </View>
        ) : (
          <View style={styles.reviewSection}>
            <Text style={styles.sectionTitle}>Review</Text>
            <Text style={styles.reviewText}>{product.Review}</Text>
          </View>
        )}

        {/* Add to Cart Button */}
        <Animated.View style={{ transform: [{ scale: buttonScale }], marginTop: 20 }}>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCartPress}>
            <Text style={styles.addToCartText}>Add to Cart / ${product.price}</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure container takes the full height of the screen
  },
  scrollViewContent: {
    padding: 10, // Add padding inside the ScrollView
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10, // Adjust padding for the header
  },
  backButton: {
    marginRight: 10,
  },
  favoriteButton: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple', // Ensures the title color is black
  },
  titleRatingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  brand: {
    paddingVertical: 3,
    fontSize: 14,
    color: 'grey',
  },
  ratingWrapper: {
    padding: 9,
    backgroundColor: 'lavender',
    borderRadius: 9,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  starStyle: {
    transform: [{ rotate: '-15deg' }],
    marginTop: -5,
  },
  rating: {
    fontSize: 16,
    color: 'grey',
    marginLeft: 5,
    marginTop: 5,
  },
  colorContainer: {
    marginTop: 20,
  },
  setcolor: {
    color: 'black',
    fontWeight: '900',
    paddingBottom: 10,
    fontSize: 16,
  },
  parentstylecolorcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorOptionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  colorOption: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  colorName: {
    fontSize: 14,
    color: 'black',
  },
  reviewSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 14,
    color: 'grey',
  },
  descriptionSection: {
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: 'black',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: 'purple',
  },
  tabText: {
    fontSize: 16,
    color: 'grey',
  },
  activeTabText: {
    color: 'purple',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: 'purple',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

