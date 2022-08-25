import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapPage from "./compnents/mapPage";
import { PictureAdderContext } from "./compnents/contexts/picModalContext";
import { PinContext } from "./compnents/contexts/staticPinContext";
import { MapCenterContext } from "./compnents/contexts/mapCenterContext";
import { MapZoomContext } from "./compnents/contexts/mapZoomContext";
import { MapBoundariesContext } from "./compnents/contexts/mapBoundariesContext";
import { MapRegionContext } from "./compnents/contexts/mapRegionContext";
import { MasterContext } from "./compnents/contexts/masterContext";
import { PinSpotContext } from "./compnents/contexts/pinSpotContext";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./compnents/stackNav";

const { width, height } = Dimensions.get("window");


export default function App() {

  const [masterSwitch, setMasterSwitch] = useState(true)
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

  const [boundaries, setBoundaries] = useState([]);

  const [region, setRegion] = useState({
    latitude: mapCenter.lat,
    longitude: mapCenter.lng,
    latitudeDelta: 5,
    longitudeDelta: 5 * (width / height),
  });

  const [zoomlev, setZoomLev] = useState(region.latitudeDelta);

  const [dragPin, setDragPin] = useState({});

  return (
    <PinSpotContext.Provider value={{ dragPin, setDragPin }}>
    <MasterContext.Provider value={{ masterSwitch, setMasterSwitch }}>
    <MapZoomContext.Provider value={{ zoomlev, setZoomLev }}>
    <MapBoundariesContext.Provider value={{ boundaries, setBoundaries }}>
    <MapRegionContext.Provider value={{ region, setRegion }}>
      <PinContext.Provider value={{ pinValues, setPinValues }}>
        <PictureAdderContext.Provider value={{ picAdderModal, setPicAdderModal }}>
          <MapCenterContext.Provider value={{ mapCenter, setMapCenter }}>
            <NavigationContainer>
              <StackNav />
            </NavigationContainer>
          </MapCenterContext.Provider>
        </PictureAdderContext.Provider>
      </PinContext.Provider>
    </MapRegionContext.Provider>
    </MapBoundariesContext.Provider>
    </MapZoomContext.Provider>
    </MasterContext.Provider>
    </PinSpotContext.Provider>
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
