import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import Constants from "expo-constants";
import Map from "./GoogleMap";
import MonthSlider from "./slider";
import FABButtons from "./FABset";
import Logo from "./logoButton";
import AnimalTopAutoSuggest from "./AnimalSuggest";
import AnimalMultiSelect from "./multiSelect";
import { DiveSitesContext } from "./contexts/diveSiteToggleContext";
import { MapCenterContext } from "./contexts/mapCenterContext";
import { PictureAdderContext } from "./contexts/picModalContext";
import { MasterContext } from "./contexts/masterContext";
import { PinSpotContext } from "./contexts/pinSpotContext";
import { PinContext } from "./contexts/staticPinContext";
import { AnimalSelectContext } from "./contexts/animalSelectContext";
import { MonthSelectContext } from "./contexts/monthSelectContext";

import { scale } from "react-native-size-matters";

export default function MapPage() {
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { dragPin } = useContext(PinSpotContext);
  const { pinValues, setPinValues } = useContext(PinContext);
  const { animalSelection } = useContext(AnimalSelectContext);
  const [monthVal, setMonthVal] = useState("");
  const { picAdderModal, setPicAdderModal } = useContext(PictureAdderContext);
  
  const [token, setToken] = useState(false);
  const [diveSitesTog, setDiveSitesTog] = useState(true);
  const [mapCenter, setMapCenter] = useState({
    lat: 49.246292,
    lng: -123.116226,
  });

  const onNavigate = () => {
    setPinValues({
      ...pinValues,
      Latitude: dragPin.lat.toString(),
      Longitude: dragPin.lng.toString(),
    });
    setMasterSwitch(true);
    setPicAdderModal(!picAdderModal);
  };

  useEffect(() => {
    if (animalSelection.length > 0) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, [animalSelection]);

  return (
    <MonthSelectContext.Provider value={{ monthVal, setMonthVal }}>
      <MapCenterContext.Provider value={{ mapCenter, setMapCenter }}>
        <DiveSitesContext.Provider value={{ diveSitesTog, setDiveSitesTog }}>
          <KeyboardAvoidingView style={styles.container} behavior="height">
            {masterSwitch && (
              <View style={styles.monthText}>
                <Text
                  style={{
                    fontFamily: "PermanentMarker_400Regular",
                    fontSize: scale(15),
                  }}
                >
                  {monthVal}
                </Text>
              </View>
            )}

            {masterSwitch && (
              <View style={styles.slider}>
                <MonthSlider style={{ zIndex: 3 }} />
              </View>
            )}

            {masterSwitch && (
              <View style={styles.animalSelect}>
                <Text
                  style={{
                    fontFamily: "Caveat_700Bold",
                    fontSize: scale(15),
                    width: scale(45),
                    marginLeft: "4%",
                    marginRight: "1%",
                    zIndex: 0,
                    marginTop: Platform.OS === "android" ? scale(4): scale(1),
                  }}
                >
                  Selected:
                </Text>
               
              </View>
            )}

            {masterSwitch && ( <AnimalMultiSelect />)}

            {masterSwitch && (
              <View style={styles.Fbuttons}>
                <FABButtons style={{ zIndex: 2 }} />
              </View>
            )}

            {!masterSwitch && (
              <View style={styles.PinButton}>
                <TouchableWithoutFeedback onPress={onNavigate}>
                  <Text
                    style={{
                      color: "#9B884E",
                      fontFamily: "PermanentMarker_400Regular",
                      fontSize: scale(15),
                      width: "90%",
                      height: "100%",
                      textAlign: "center",
                      backgroundColor: "#355D71",
                    }}
                  >
                    Set Pin
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            )}
            <Logo style={styles.Logo} />
            <Map style={{ zIndex: 1 }} />
          </KeyboardAvoidingView>
        </DiveSitesContext.Provider>
      </MapCenterContext.Provider>
    </MonthSelectContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  PinButton: {
    position: "absolute",
    alignItems: "center",
    bottom: scale(30),
    backgroundColor: "palegreen",
    width: scale(100),
    height: scale(40),
    zIndex: 2,
    borderRadius: scale(15),
    opacity: 0.8,
    paddingTop: scale(-5),
  },
  slider: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    top: Constants.statusBarHeight + scale(10),
    width: "80%",
    height: scale(38),
    zIndex: 2,
    borderRadius: scale(15),
    opacity: 0.8,
    paddingBottom: 0,
    paddingTop: scale(10),
    backgroundColor: "white",
    paddingRight: "2%",
    paddingLeft: "2%",
  },
  monthText: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    top: Constants.statusBarHeight + scale(10),
    width: "10%",
    height: scale(20),
    zIndex: 3,
    borderRadius: scale(15),
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: "transparent",
    opacity: 0.8,
  },
  animalSelect: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    top: Constants.statusBarHeight + scale(43),
    width: scale(250),
    height: "auto",
    zIndex: 1,
    borderBottomRightRadius: scale(15),
    borderBottomLeftRadius: scale(15),
    opacity: 0.8,
    marginTop: scale(5),
    paddingTop: scale(0),
    backgroundColor: "white",
  },
  Fbuttons: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 5,
    width: 100,
    height: 40,
    zIndex: 2,
    borderRadius: 15,
    opacity: 0.8,
    paddingTop: -5,
  },
  PinButton: {
    position: "absolute",
    alignItems: "center",
    textAlign: "center",
    bottom: scale(28),
    backgroundColor: "#355D71",
    borderWidth: 1,
    borderTopColor: "darkgrey",
    borderColor: "transparent",
    marginBottom: 5,
    borderRadius: scale(5),
    width: "50%",
    zIndex: 2,
  },
});
