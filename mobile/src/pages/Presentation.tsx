import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import worldImg from '../images/world.png';
import orphanageImg from '../images/orphanage.png';

import ButtonNextPresentation from '../components/ButtonNextPresentation';

const Presentation: React.FC = ()=> {
   return(
      <Onboarding
         pages={[
            {
               backgroundColor: '#EBF2F5',
               image: <Image source={worldImg} />,
               title: 'Leve felicidade para o mundo',
               subtitle: 'Visite orfanatos e mude o dia de muitas crianças.'
            },
            {
               backgroundColor: '#EBF2F5',
               image: <Image source={orphanageImg} />,
               title: 'Escolha um orfanato no mapa e faça uma visita',
               subtitle: ''
            }
         ]}
         showSkip={false}
         containerStyles={styles.container}
         imageContainerStyles={styles.image}
         titleStyles={styles.title}
         subTitleStyles={styles.subtitle}
         NextButtonComponent={ButtonNextPresentation}
         DoneButtonComponent={ButtonNextPresentation}
         allowFontScalingText={false}
         
      />
   )
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      // padding: 20
      justifyContent: 'center',
      // alignItems: 'flex-start',
      // padding: 20
   },

   image: {
      width:256
   },

   title: {
      fontFamily: 'Nunito_800ExtraBold',
      color: '#0089A5',
      fontSize: 36,
      width: 217,
      textAlign: 'left',
      alignItems: 'flex-start'
   },

   subtitle: {
      fontFamily: 'Nunito_600SemiBold',
      color: '#5C8599',
      fontSize: 20,
   }
})


export default Presentation;