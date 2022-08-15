import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Map from "./GoogleMap";
import MonthSlider from "./slider";
import FABButtons from "./FABset";
import { DiveSitesContext } from "./contexts/diveSiteToggleContext";

export default function MapPage() {

  const [diveSitesTog, setDiveSitesTog] = useState(true);

  return (
    <DiveSitesContext.Provider value={{diveSitesTog, setDiveSitesTog}}>
    <View style={styles.container}>
      <MonthSlider style={{zIndex: 2}}/>
      <FABButtons style={{zIndex: 2}}/>
      <Map style={{zIndex: 1}}/>
    </View>
    </DiveSitesContext.Provider>
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
