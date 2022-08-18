import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapPage from "./compnents/mapPage";
import { PictureAdderContext } from "./compnents/contexts/picModalContext";

export default function App() {
  const [picAdderModal, setPicAdderModal] = useState(false);

  return (
    <PictureAdderContext.Provider value={{ picAdderModal, setPicAdderModal }}>
      <View style={styles.container}>
        <MapPage />
      </View>
    </PictureAdderContext.Provider>
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
