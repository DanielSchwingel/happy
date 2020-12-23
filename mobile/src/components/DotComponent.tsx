import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DotProps } from 'react-native-onboarding-swiper';

const DotComponent: React.FC<DotProps> = ( props )=> {
   return(
      <View 
         style={(props.selected ? styles.active : styles.default)}
         {...props}
      />
   );
}

const styles = StyleSheet.create({
   active: {
      width: 16,
      height: 4,
      backgroundColor: '#FFD152',
      borderRadius: 4,
      marginHorizontal: 8,
      marginBottom:20,

   },

   default: {
      width: 8,
      height: 4,
      backgroundColor: '#BECFD8',
      borderRadius: 4,
      marginBottom:20
   },
})

export default DotComponent;