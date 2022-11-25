import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import "react-native-url-polyfill/auto";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
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
import { SwankyandMooMoo_400Regular } from '@expo-google-fonts/swanky-and-moo-moo';
import { Lemonada_300Light } from "@expo-google-fonts/lemonada";
import { PoiretOne_400Regular } from '@expo-google-fonts/poiret-one';
import { ShadowsIntoLight_400Regular } from "@expo-google-fonts/shadows-into-light";
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
import { SelectedDiveSiteContext } from "./compnents/contexts/selectedDiveSiteContext";
import { SessionContext } from "./compnents/contexts/sessionContext";

import MapPage from "./compnents/mapPage";
import AuthenticationPage from "./compnents/authenticationPage";
import { getCurrentCoordinates } from "./compnents/helpers/permissionsHelpers";
import { sessionCheck, userCheck, sessionRefresh } from "./supabaseCalls/authenticateSupabaseCalls";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [masterSwitch, setMasterSwitch] = useState(true);
  const [picAdderModal, setPicAdderModal] = useState(false);
  const [diveSiteAdderModal, setDiveSiteAdderModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [activeSession, setActiveSession] = useState(null);

  let currentMonth = new Date().getMonth() + 1;
  const [sliderVal, setSliderVal] = useState(currentMonth);

  const [pinValues, setPinValues] = useState({
    PicFile: null,
    Animal: "",
    PicDate: "",
    Latitude: "",
    Longitude: "",
    DDVal: "0",
  });

   const [selectedDiveSite, setSelectedDiveSite] = useState({
    SiteName: "",
    Latitude: "",
    Longitude: "",
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

  const getCurrentLocation = async () => {
    try {
      const location = await getCurrentCoordinates();
      if (location) {
        setRegion({
          ...region,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  let [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
    Caveat_400Regular,
    Caveat_500Medium,
    Caveat_600SemiBold,
    Caveat_700Bold,
    IndieFlower_400Regular,
    ShadowsIntoLight_400Regular,
    PoiretOne_400Regular,
    Lemonada_300Light,
    SwankyandMooMoo_400Regular
  });

  useLayoutEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      // await getCurrentLocation();

      try {
        const valuless = await AsyncStorage.getItem('token')
        const value = JSON.parse(valuless)
        if (value !== null){
          if(value.session.refresh_token){
            let newSession = await sessionRefresh(value.session.refresh_token)
          }
          
          setActiveSession(value)
        }
        let sessionID = await sessionCheck()
        console.log("what are theses", sessionID)
        await AsyncStorage.removeItem('token')
      } catch(error) {
        console.log("huh", error)
      };
  
      setAppIsReady(true);
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <SelectedDiveSiteContext.Provider value={{ selectedDiveSite, setSelectedDiveSite }}>
        <PictureContext.Provider value={{ uploadedFile, setUploadedFile }}>
          <SliderContext.Provider value={{ sliderVal, setSliderVal }}>
            <AnimalSelectContext.Provider
              value={{ animalSelection, setAnimalSelection }}
            >
              <PinSpotContext.Provider value={{ dragPin, setDragPin }}>
                <MasterContext.Provider
                  value={{ masterSwitch, setMasterSwitch }}
                >
                  <MapZoomContext.Provider value={{ zoomlev, setZoomLev }}>
                    <MapBoundariesContext.Provider
                      value={{ boundaries, setBoundaries }}
                    >
                      <MapRegionContext.Provider value={{ region, setRegion }}>
                        <PinContext.Provider
                          value={{ pinValues, setPinValues }}
                        >
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
                                <SessionContext.Provider
                                value={{ activeSession, setActiveSession }}
                                >

                                {activeSession ? <MapPage/> : <AuthenticationPage/>}

                                </SessionContext.Provider>
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
      </SelectedDiveSiteContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
