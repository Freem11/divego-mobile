import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Map from "./GoogleMap";
import MonthSlider from "./slider";
import FABButtons from "./FABset";
import { DiveSitesContext } from "./contexts/diveSiteToggleContext";
import { MapCenterContext } from "./contexts/mapCenterContext";
export default function MapPage() {
  const [diveSitesTog, setDiveSitesTog] = useState(true);
  const [mapCenter, setMapCenter] = useState({
    lat: 49.246292,
    lng: -123.116226,
  });

  console.log("at mapPage", mapCenter)
  return (
    <MapCenterContext.Provider value={{mapCenter, setMapCenter}}>
      <DiveSitesContext.Provider value={{ diveSitesTog, setDiveSitesTog }}>
        <View style={styles.container}>
          <MonthSlider style={{ zIndex: 2 }} />
          <FABButtons style={{ zIndex: 2 }} />
          <Map style={{ zIndex: 1 }} />
        </View>
      </DiveSitesContext.Provider>
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
