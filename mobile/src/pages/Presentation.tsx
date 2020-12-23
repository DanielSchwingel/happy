import React from 'react';
import { View, StatusBar, Image, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';

import worldImg from '../images/world.png';
import orphanageImg from '../images/orphanage.png';

import DotComponent from '../components/DotComponent';
import NextButtonComponent from  '../components/NextButtonComponent';


const Presentation: React.FC = ()=> {
   const navigation = useNavigation();

   function handleDone(){
      navigation.navigate('OrphanagesMap');
   }

   return(
      <View style={styles.container}> 
         <StatusBar barStyle="light-content" backgroundColor='#EBF2F5'/>
         <Onboarding
            pages={[
               {
                  backgroundColor: '#EBF2F5',
                  image: <Image source={worldImg} style={styles.image_world} />,
                  title: 'Leve felicidade para o mundo',
                  subtitle: 'Visite orfanatos e mude o dia de muitas crianças.',
                  titleStyles: styles.title_world,
                  subTitleStyles: styles.subtitle_world
               },
               {
                  backgroundColor: '#EBF2F5',
                  image: <Image source={orphanageImg} />,
                  title: 'Escolha um orfanato no mapa e faça uma visita',
                  subtitle: '',
                  titleStyles: styles.title_orphanage
               }
            ]}
            onDone={handleDone}
            showSkip={false}
            showNext={false}
            bottomBarHighlight={false}
            containerStyles={styles.container_onboarding}

            NextButtonComponent={NextButtonComponent as any}
            DoneButtonComponent={NextButtonComponent as any}
            DotComponent={DotComponent}
            
         />
      </View>
   )
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center'
   },

   container_onboarding: {
      padding: 40
   },

   image_world: {
      width: 210,
      height: 220,
   },

   title_world: {
      fontFamily: 'Nunito_800ExtraBold',
      color: '#0089A5',
      fontSize: 36,
      paddingRight: '10%',
      textAlign: 'left',   
   },

   subtitle_world: {
      fontFamily: 'Nunito_600SemiBold',
      color: '#5C8599',
      fontSize: 20,
      textAlign: 'left'
   },

   title_orphanage: {
      fontFamily: 'Nunito_800ExtraBold',
      color: '#0089A5',
      fontSize: 26,
      paddingLeft: '10%',
      textAlign: 'right',   
   },
})


export default Presentation;