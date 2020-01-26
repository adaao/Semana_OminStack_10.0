import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons';
//import { requestPermissionAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }){
   const [currentRegion, setCurrentRegion] = useState(null);
   useEffect(() => {
      async function loadInitialPosition(){
         //const { granted } = await requestPermissionAsync();
         const { granted } = await Permissions.askAsync(Permissions.LOCATION);

         if (granted) {
            const { coords } = await Location.getCurrentPositionAsync({
               enableHighAccuracy: true,
            });

            const { latitude, longitude } = coords;

            setCurrentRegion({
               latitude,
               longitude,
               latitudeDelta: 0.04,
               longitudeDelta: 0.04,
            });

         }
      } 

      loadInitialPosition();
   }, []);

   if(!currentRegion){
      return null;
   }

   const ghun = 'adaao';

   return (
            
      <>
         <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={currentRegion} title={ 'eu!' } description={ 'eu estou bem aqui' }>
               <Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/16517823?s=460&v=4' }}/>
               <Callout onPress={() => {
                  navigation.navigate('Profile', { github_username: ghun});
               }} >
                  <View style={styles.callout}>
                     <Text style={styles.devName}>{ghun}</Text>
                     <Text style={styles.devBio} >Bio at Github</Text>
                     <Text style={styles.devTechs} >Techs of the dev</Text>
                  </View>
               </Callout>
            </Marker>
         </MapView>

         <View style={styles.searchForm}>
               <TextInput 
                  style={styles.searchInput}
                  placeholder='Buscar devs por techs...'
                  placeholderTextColor='#999'
                  autoCapitalize='words'
                  autoCorrect={false}
               />
               <TouchableOpacity onPress={() => {}}  style={styles.loadButton} >
                  <MaterialIcons name='my-location' size={20} color='#FFF' />
               </TouchableOpacity>
         </View>
      </>
   );
}

const styles = StyleSheet.create({
   map: { 
      flex: 1 
   },

   avatar: {
      width: 54,
      height: 54,
      borderRadius: 4,
      borderWidth: 4,
      borderColor: '#FFF',
   },

   callout: {
      width: 260,
   },

   devName: {
      fontWeight: 'bold',
      fontSize: 16,
   },

   devBio: {
      color: '#666',
      marginTop: 5,
   },

   devTechs: {
      marginTop: 5,
   },

   searchForm: {
      position: "absolute",
      //mudar de top para botton e usar a o event listening da api
      //Keyboard do react-native para o teclado nao ficar 
      //por cima da barra ao digitar     
      top: 20,
      left: 20,
      right: 20,
      zIndex: 5,
      flexDirection: "row",
   },

   searchInput: {
      flex: 1,
      height: 50,
      backgroundColor: '#FFF',
      color: '#333',
      borderRadius: 25,
      paddingHorizontal: 20,
      fontSize: 16, 
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {
         height: 4,
         width: 4,
      },
      elevation: 2,
   },

   loadButton: {
      width: 50, 
      height: 50, 
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 15,
      backgroundColor: '#8E4DFF',
   }
});

export default Main;
