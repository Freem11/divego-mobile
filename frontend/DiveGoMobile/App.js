import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapPage from "./compnents/mapPage";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { IndieFlower_400Regular } from "@expo-google-fonts/indie-flower";
import { PermanentMarker_400Regular } from "@expo-google-fonts/permanent-marker";
import {
  Caveat_400Regular,
  Caveat_500Medium,
  Caveat_600SemiBold,
  Caveat_700Bold,
} from "@expo-google-fonts/caveat";
import { ShadowsIntoLight_400Regular } from '@expo-google-fonts/shadows-into-light';

import { PictureAdderContext } from "./compnents/contexts/picModalContext";
import { DSAdderContext } from "./compnents/contexts/DSModalContext";
import { PinContext } from "./compnents/contexts/staticPinContext";
import { MapCenterContext } from "./compnents/contexts/mapCenterContext";
import { MapZoomContext } from "./compnents/contexts/mapZoomContext";
import { MapBoundariesContext } from "./compnents/contexts/mapBoundariesContext";
import { MapRegionContext } from "./compnents/contexts/mapRegionContext";
import { MasterContext } from "./compnents/contexts/masterContext";
import { PinSpotContext } from "./compnents/contexts/pinSpotContext";
import { SliderContext } from "./compnents/contexts/sliderContext";
import { AnimalSelectContext } from "./compnents/contexts/animalSelectContext";
import { PictureContext } from "./compnents/contexts/pictureContext";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import StackNav from "./compnents/stackNav";

const { width, height } = Dimensions.get("window");

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [masterSwitch, setMasterSwitch] = useState(true);
  const [picAdderModal, setPicAdderModal] = useState(false);
  const [diveSiteAdderModal, setDiveSiteAdderModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  let craxy = new Date().getMonth() + 1;
  const [sliderVal, setSliderVal] = useState(craxy);

  const [pinValues, setPinValues] = useState({
    PicFile: null,
    Animal: "Animal",
    PicDate: "",
    Latitude: "",
    Longitude: "",
    DDVal: "0",
  });

  const [animalSelection, setAnimalSelection] = useState("");

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

  let [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
    Caveat_400Regular,
    Caveat_500Medium,
    Caveat_600SemiBold,
    Caveat_700Bold,
    IndieFlower_400Regular,
    ShadowsIntoLight_400Regular,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <PictureContext.Provider value={{ uploadedFile, setUploadedFile }}>
        <SliderContext.Provider value={{ sliderVal, setSliderVal }}>
          <AnimalSelectContext.Provider
            value={{ animalSelection, setAnimalSelection }}
          >
            <PinSpotContext.Provider value={{ dragPin, setDragPin }}>
              <MasterContext.Provider value={{ masterSwitch, setMasterSwitch }}>
                <MapZoomContext.Provider value={{ zoomlev, setZoomLev }}>
                  <MapBoundariesContext.Provider
                    value={{ boundaries, setBoundaries }}
                  >
                    <MapRegionContext.Provider value={{ region, setRegion }}>
                      <PinContext.Provider value={{ pinValues, setPinValues }}>
                        <PictureAdderContext.Provider
                          value={{ picAdderModal, setPicAdderModal }}
                        >
                          <DSAdderContext.Provider
                            value={{
                              diveSiteAdderModal,
                              setDiveSiteAdderModal,
                            }}
                          >
                            <MapCenterContext.Provider
                              value={{ mapCenter, setMapCenter }}
                            >
                              <NavigationContainer>
                                <StackNav />
                              </NavigationContainer>
                            </MapCenterContext.Provider>
                          </DSAdderContext.Provider>
                        </PictureAdderContext.Provider>
                      </PinContext.Provider>
                    </MapRegionContext.Provider>
                  </MapBoundariesContext.Provider>
                </MapZoomContext.Provider>
              </MasterContext.Provider>
            </PinSpotContext.Provider>
          </AnimalSelectContext.Provider>
        </SliderContext.Provider>
      </PictureContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
