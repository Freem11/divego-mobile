import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Map from "./GoogleMap";
import MonthSlider from "./slider";
import FABButtons from "./FABset";


export default function MapPage() {

  return (
    <View style={styles.container}>
      <MonthSlider style={{zIndex: 2}}/>
      <FABButtons style={{zIndex: 2}}/>
      <Map style={{zIndex: 1}}/>
    </View>
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
