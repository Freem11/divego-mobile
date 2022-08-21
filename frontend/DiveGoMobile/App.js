import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapPage from "./compnents/mapPage";
import { PictureAdderContext } from "./compnents/contexts/picModalContext";
import { PinContext } from "./compnents/contexts/staticPinContext";

export default function App() {
  const [picAdderModal, setPicAdderModal] = useState(false);

  const [pinValues, setPinValues] = useState({
    PicFile: null,
    Animal: "",
    PicDate: "",
    Latitude: "",
    Longitude: "",
  });


  return (
    <PinContext.Provider value={{ pinValues, setPinValues }}>
    <PictureAdderContext.Provider value={{ picAdderModal, setPicAdderModal }}>
      <View style={styles.container}>
        <MapPage />
      </View>
    </PictureAdderContext.Provider>
    </PinContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
