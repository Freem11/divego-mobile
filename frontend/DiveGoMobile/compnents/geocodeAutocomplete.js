import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text, ScrollView, Modal} from "react-native";
import PlacesInput from "react-native-places-input";
import config  from '../config';
import { MapCenterContext } from "./contexts/mapCenterContext";

export default function GeocodeAutoComplete() {
  const { setMapCenter} = useContext(MapCenterContext);

return(
    <View style={styles.container}>
        <PlacesInput 
        googleApiKey={config.GOOGLE_MAPS_API_KEY}
        placeholder={"Go to..."}
        language={"en-US"}
        onSelect={place => setMapCenter({
                lat: place.result.geometry.location.lat, 
                lng: place.result.geometry.location.lng
            })}
        stylesList={{borderRadius: 10}}
        stylesInput={{borderRadius: 25, height: 40, width:200}}
        />
    </View>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: 200,
      height: 500,
      backgroundColor: "white",
      borderRadius: 20,
      zIndex: 1,
      transform: [{ scaleX: -1}]
    },
   
  });