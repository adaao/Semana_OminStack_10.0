import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons';
//import { requestPermissionAsync, getCurrentPositionAsync } from 'expo-location';
import api from '../services/api'


function Main({ navigation }){
   const [devs, setDevs] = useState([]);
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

   async function loadDevs(){
      const {latitude, longitude} = currentRegion;

      const response = await api.get('/search', {
         params: {
            latitude,
            longitude,
            techs: 'ReactJs',
         }   
      });

      setDevs(response.data.devs);

   }

   function handleRegionChanged(region){
      setCurrentRegion(region);
   }

   if(!currentRegion){
      return null;
   }

   return (
      <>
         <MapView 
            onRegionChangeComplete={handleRegionChanged}
            initialRegion={currentRegion} 
            style={styles.map}
         >
            {devs.map(dev => (
               <Marker
                  key={dev._id} 
                  coordinate={{
                     longitude: dev.location.coordinates[0],
                     latitude: dev.location.coordinates[1],
                  }} 
                  title={dev.name} 
                  description={dev.bio}
               >
               <Image 
                  style={styles.avatar} 
                  source={{ uri: dev.avatar_url }}
               />
               <Callout onPress={() => {
                  navigation.navigate('Profile', { github_username: dev.github_username});
               }} >
                  <View style={styles.callout}>
                     <Text style={styles.devName}>{dev.github_username}</Text>
                     <Text style={styles.devBio} >{dev.bio}</Text>
                     <Text style={styles.devTechs} >{dev.techs.join(', ')}</Text>
                  </View>
               </Callout>
            </Marker>
            ))}
         </MapView>

         <View style={styles.searchForm}>
               <TextInput 
                  style={styles.searchInput}
                  placeholder='Buscar devs por techs...'
                  placeholderTextColor='#999'
                  autoCapitalize='words'
                  autoCorrect={false}
               />
               <TouchableOpacity onPress={loadDevs}  style={styles.loadButton} >
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
