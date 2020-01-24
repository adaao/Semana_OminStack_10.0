import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
//import { requestPermissionAsync, getCurrentPositionAsync } from 'expo-location';

function Main(){
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

   return <MapView initialRegion={currentRegion} style={styles.map}/>
}

const styles = StyleSheet.create({
   map: { flex: 1 },
});

export default Main;
