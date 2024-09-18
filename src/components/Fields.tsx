import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { category } from '../data/category';

// Define props types
interface FieldsProps {
  selectedfield: string;
  handlednewfield: (field: string) => void;
}

const Fields: React.FC<FieldsProps> = ({ selectedfield, handlednewfield }) => {
  return (
    <FlatList
      data={category}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlednewfield(item.name)}>
        
          <Text
        
            style={[
              styles.fieldtext,
              selectedfield === item.name ? { color: 'purple' } : { color: 'grey' }
            ]}
          >
            {item.name}
          </Text>
          {selectedfield === item.name && <View style={styles.underline}></View>}
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      ItemSeparatorComponent={() => <View style={{ paddingHorizontal: 6 }} />}
    />
  );
};

export default Fields;

const styles = StyleSheet.create({
  fieldtext: {
    color: 'grey',
    fontSize: 15,
    marginLeft: 6,
    marginRight: 8,
    paddingTop: 12
  },
  underline: {
    borderBottomWidth: 2,
    width: '85%',
    borderBottomColor: 'purple',
    marginTop: 1,
    marginLeft: 5,
    marginBottom: 10
  }
});
