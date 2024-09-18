import { Animated, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Fields from '../components/Fields';
import ProductCart from '../components/ProductCart';
import { smartWatch } from '../data/smartwatch';
import { headphone } from '../data/headphones';

const Homescreen = () => {
  const [selectedfield, setselectedfield] = useState('Smart Watch');
  const [data, setdata] = useState(smartWatch);

  // Animation state for the headline
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Transition duration (1 second)
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlednewfield = (newfield: string) => {
    if (newfield === 'Smart watch') {
      setdata(smartWatch);
    } else if (newfield === 'Air pods') {
      setdata(headphone);
    } else {
      setselectedfield(newfield);
    }
  };

  const renderHeader = () => (
    <View>
      {/* Animated Watch Hub headline */}
      <Animated.Text style={[style.headline, { opacity: fadeAnim }]}>
        Watch Hub
      </Animated.Text>
      <View style={style.mainInputContainer}>
        <View style={style.InputWrapper}>
          <Image source={require('../assets/search.png')} style={style.logo} />
          <TextInput
            placeholderTextColor={'grey'}
            placeholder='Search your watch'
            style={style.textinput}
          />
        </View>
        <Image
          source={require('../assets/category.png')}
          style={{ marginRight: 10, marginTop: 19, height: 20, width: 20 }}
        />
      </View>
      {/* The Fields component for category selection */}
      <Fields selectedfield={selectedfield} handlednewfield={handlednewfield} />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ProductCart product={item} />}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-evenly' }}
      contentContainerStyle={{ paddingBottom: 500 }}
      ListHeaderComponent={renderHeader}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Homescreen;

const style = StyleSheet.create({
  headline: {
    color: '#4B0082', // Use a deep indigo color for elegance
    padding: 20,
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
    letterSpacing: 2, // Add letter spacing for a more stylish look
  },
  mainInputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20, // Add margin to space out elements
  },
  InputWrapper: {
    marginLeft: 14,
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#4B0082', // Use the same indigo color for consistency
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15, // Add some padding to make the input look better
    backgroundColor: '#F5F5F5', // Light background for the input field
  },
  logo: {
    height: 20,
    width: 20,
    tintColor: 'blue', // Change the color of the search icon to grey
  },
  textinput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16, // Increase font size for better readability
  },
});
