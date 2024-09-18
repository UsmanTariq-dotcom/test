// Define a type for the product details route parameters
export type RootStackParamList = {
  Home: undefined; // No parameters for Home screen
  Details: {
    productId: number; // Pass productId to the details screen
  };
};
