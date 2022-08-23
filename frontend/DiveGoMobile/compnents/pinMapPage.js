import React, { useState, useContext } from "react";
import { StyleSheet, View, Button } from "react-native";
import PinMap from "./PinMap";
import { MapCenterContext } from "./contexts/mapCenterContext";
import { PictureAdderContext } from "./contexts/picModalContext";
import { useNavigation } from "@react-navigation/native";

export default function PinMapPage() {

  const { picAdderModal, setPicAdderModal } = useContext(PictureAdderContext);
  const { mapCenter, setMapCenter } = useContext(MapCenterContext);
  const navigation = useNavigation();

  const onNavigate = () => {
    navigation.navigate("MapPage")
    setPicAdderModal(!picAdderModal)
  }

  return (

    
    
    <MapCenterContext.Provider value={{mapCenter, setMapCenter}}>
        <View style={styles.container}>
          <View style={styles.PinButton}>
            <Button title="Set Pin" onPress={onNavigate}/>
          </View>
          <PinMap style={{ zIndex: 1 }} />
        </View>
    </MapCenterContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  PinButton : {
    position: "absolute",
    alignItems: "center",
    top: 40,
    backgroundColor: "palegreen",
    width: 100,
    height: 40,
    zIndex: 2,
    borderRadius: 15,
    opacity: .8,
    paddingTop: -5

  },
});
