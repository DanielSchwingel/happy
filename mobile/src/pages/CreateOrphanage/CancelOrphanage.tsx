import React from 'react';
import { StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CancelOrphanage: React.FC = ()=>{
   const navigation = useNavigation();

   function handleYes(){
      navigation.navigate('OrphanagesMap')
   }  

   function handleNo(){
      navigation.goBack();
   }
   return(
      <View style={styles.container}>
         <StatusBar barStyle='dark-content' backgroundColor='#FF669D'/>
         <View style={styles.image}>
            <Feather name='x' size={32} color='#FF669D'/>
         </View>
         <Text style={styles.title}>
            Cancelar cadastro
         </Text>
         <Text style={styles.text}>
            Tem certeza que quer cancelar esse cadastro?
         </Text>
         <View style={styles.grid_buttons}>
            <TouchableOpacity style={styles.button_no} onPress={handleNo}>
               <Text style={styles.button_text}>Não</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_yes} onPress={handleYes}>
               <Text style={styles.button_text}>Sim</Text>
            </TouchableOpacity>
         </View>
      </View>
   )
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#FF669D',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
   },

   image: {
      width: 64,
      height: 64,
      borderRadius: 16,
      backgroundColor: '#FFFFFF',
      
      alignItems:'center',
      justifyContent: 'center'
   },

   title: {
      fontFamily: 'Nunito_800ExtraBold',
      fontSize: 32,
      color: '#FFFFFF',
      marginTop: 35
   },

   text: {
      fontFamily: 'Nunito_600SemiBold',
      fontSize: 20,
      color: '#FFFFFF',
      width: 213,
      marginTop: 35

   },

   grid_buttons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '85%',
      marginTop: 35
   },

   button_no: {
      width: 128,
      height: 56,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#D6487B',
      alignItems: 'center',
      justifyContent: 'center'
   },

   button_yes: {
      width: 128,
      height: 56,
      borderRadius: 20,
      backgroundColor: '#D6487B',
      alignItems: 'center',
      justifyContent: 'center'
   },

   button_text: {
      fontFamily: 'Nunito_800ExtraBold',
      fontSize: 15,
      color: '#FFFFFF'
   }
})

export default CancelOrphanage;