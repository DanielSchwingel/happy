import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NextButtonProps from 'react-native-onboarding-swiper';


const NextButtonComponent: React.FC<NextButtonProps> = (props)=>{
   return(
      <TouchableOpacity style={styles.container} {...props}> 
         <Feather name='arrow-right' size={20} color='#15B6D6'/>
      </TouchableOpacity>
   )
};

const styles = StyleSheet.create({
   container: {
      justifyContent: 'center',
      alignItems: 'center',

      width:56,
      height:56,
      borderRadius: 20,
      marginRight: 50,
      marginBottom: 20,
      backgroundColor: '#D1EDF2',

   }
})



export default NextButtonComponent;