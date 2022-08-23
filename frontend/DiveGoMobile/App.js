import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapPage from "./compnents/mapPage";
import { PictureAdderContext } from "./compnents/contexts/picModalContext";
import { PinContext } from "./compnents/contexts/staticPinContext";
import { MapCenterContext } from "./compnents/contexts/mapCenterContext";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./compnents/stackNav";

export default function App() {
  const [picAdderModal, setPicAdderModal] = useState(false);

  const [pinValues, setPinValues] = useState({
    PicFile: null,
    Animal: "",
    PicDate: "",
    Latitude: "",
    Longitude: "",
  });

  const [mapCenter, setMapCenter] = useState({
    lat: 49.246292,
    lng: -123.116226,
  });

  return (
    <PinContext.Provider value={{ pinValues, setPinValues }}>
      <PictureAdderContext.Provider value={{ picAdderModal, setPicAdderModal }}>
        <MapCenterContext.Provider value={{ mapCenter, setMapCenter }}>
          <NavigationContainer>
            <StackNav />
          </NavigationContainer>
        </MapCenterContext.Provider>
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
