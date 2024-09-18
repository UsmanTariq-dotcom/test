import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation.tsx/types'; // Import your navigation types

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  images: string[];
  details: string;
  Review: string;
}

const ProductCart = ({ product }: { product: Product }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleDetails = () => {
    // Pass productId as a parameter when navigating to the Details screen
    navigation.navigate('Details', { productId: product.id });
    
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleDetails}>
      <View style={styles.imagewrapper}>
        <Image source={{ uri: product.image }} style={styles.productimage} />
      </View>
      <View>
        <Text style={styles.inputtext} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.insidetext}>{product.brand}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCart;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: -1,
    marginRight: -1,
    height: 190,
    width: "45%",
    elevation: 9,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  imagewrapper: {
    backgroundColor: "#FFC8B7",
    marginBottom: 10,
    marginTop: 12,
    marginLeft: 9,
    marginRight: 9,
    borderRadius: 10,
    overflow: 'hidden',
  },
  productimage: {
    height: 110,
    width: "100%",
    resizeMode: "center",
  },
  inputtext: {
    color: "black",
    marginLeft: 12,
    fontSize: 15,
  },
  insidetext: {
    color: "grey",
    marginLeft: 7,
  },
  price: {
    color: "purple",
    marginLeft: 10,
    fontWeight: "bold",
  },
});
