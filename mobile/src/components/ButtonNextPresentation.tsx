import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';


const ButtonNextPresentation: React.FC = () => {
   return ( 
      <View style={styles.container}>
         <Feather name='arrow-right' size={20} color='#15B6D6' />
      </View>
   )
};

const styles = StyleSheet.create({
   container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 45,
      height:45,
      backgroundColor: '#D1EDF2',
      margin: 20,
      borderRadius: 8,
   }
})

export default ButtonNextPresentation;