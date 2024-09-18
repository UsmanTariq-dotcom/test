import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './src/screens/Homescreen';
import ProductDetailsScreen from './src/screens/ProductdeatilsScreen'; // Fix typo here
import { RootStackParamList } from './src/navigation.tsx/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Details" component={ProductDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
