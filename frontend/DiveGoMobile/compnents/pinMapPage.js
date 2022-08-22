import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import PinMap from "./PinMap";
import { MapCenterContext } from "./contexts/mapCenterContext";

export default function PinMapPage() {

  return (
    
    <MapCenterContext.Provider value={{mapCenter, setMapCenter}}>
        <View style={styles.container}>
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
});
