import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Header = () => {
  return (
    <View style={styles.container}>
    <TouchableOpacity>
        <Ionicons name='arrow-back' size={30} color={"grey"} />

    </TouchableOpacity>
    <TouchableOpacity>
        <AntDesign name='hearto' size={25} color={"grey"} />
        
    </TouchableOpacity>
     
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
      
        
    }
})