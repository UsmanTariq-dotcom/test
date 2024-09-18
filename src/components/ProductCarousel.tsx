import { Dimensions, FlatList, Image, StyleSheet, Text, View, Animated } from 'react-native';
import React, { useState } from 'react';

// Define the type for the images prop
interface ProductCarouselProps {
  images: string[]; // images is an array of strings (URLs)
}

const screenWidth = Dimensions.get('window').width;

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active index

  // Event handler for scrolling to update activeIndex
  const onScroll = (event: any) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / screenWidth
    );
    setActiveIndex(slideIndex);
  };

  return (
    <>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View style={styles.imageviewWrapper}>
            <Image source={{ uri: item }} style={styles.productImage} />
          </View>
        )}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={screenWidth}
        decelerationRate="fast"
        onScroll={onScroll} // Listen for the scroll event
      />

      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? 'purple' : 'grey',
                width: index === activeIndex ? 20 : 10,
                height: index === activeIndex ? 10 : 10,
              },
            ]}
          />
        ))}
      </View>
    </>
  );
};

export default ProductCarousel;

const styles = StyleSheet.create({
  imageviewWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    padding: 12,
  },
  productImage: {
    height: 250,
    width: 250,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  pagination: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
