import React from 'react'
import { View, StatusBar, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import confirmImg from '../../images/confirm.png'

const ConfirmOrphanage: React.FC = () => {
   const navigation = useNavigation();

   function handleConfirm(){
      navigation.navigate('OrphanagesMap')
   }

   return(
      <View style={styles.container}>
         <StatusBar barStyle='dark-content' backgroundColor='#39CC83'/>
         <Image source={confirmImg}/>
         <Text style={styles.title}>
            Ebaaa!
         </Text>
         <Text style={styles.text}>
            O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)
         </Text>
         <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.button_text}>Ok</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#39CC83',
      padding: 20
   },

   title: {
      fontFamily:'Nunito_800ExtraBold',
      fontSize: 40,
      color: '#FFFFFF',
      marginTop: 35
   },

   text: {
      fontFamily:'Nunito_600SemiBold',
      fontSize: 20,
      color: '#FFFFFF',
      marginTop: 35,
      width: 309,
      textAlign: 'center'
   },

   button: {
      width: 120,
      height: 56,
      borderRadius: 20,
      marginTop: 35,

      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor: '#19C06D',
   },

   button_text: {
      fontFamily: 'Nunito_800ExtraBold',
      fontSize: 15,
      color: '#FFFFFF'
   }
})

export default ConfirmOrphanage;