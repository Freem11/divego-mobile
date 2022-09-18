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
import { DiveSitesContext } from "./contexts/diveSiteToggleContext";
import { MapCenterContext } from "./contexts/mapCenterContext";
import { PictureAdderContext } from "./contexts/picModalContext";
import { MasterContext } from "./contexts/masterContext";
import { PinSpotContext } from "./contexts/pinSpotContext";
import { PinContext } from "./contexts/staticPinContext";
import { AnimalSelectContext } from "./contexts/animalSelectContext";
import { MonthSelectContext } from "./contexts/monthSelectContext";

export default function MapPage() {
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { dragPin } = useContext(PinSpotContext);
  const { pinValues, setPinValues } = useContext(PinContext);
  const { animalSelection } = useContext(AnimalSelectContext);
  const [monthVal, setMonthVal] = useState("");
  const { picAdderModal, setPicAdderModal } = useContext(PictureAdderContext);

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
  const [token, setToken] = useState(false);

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
                <Text style={{ fontFamily: "PermanentMarker_400Regular" }}>
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
                {token && (
                  <Text style={{ fontFamily: "Caveat_700Bold" }}>
                    {" "}
                    Selected: {animalSelection}{" "}
                  </Text>
                )}
                {!token && (
                  <Text style={{ fontFamily: "Caveat_700Bold" }}>
                    {" "}
                    Selected: All{" "}
                  </Text>
                )}
              </View>
            )}

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
                      color: "blue",
                      fontFamily: "PermanentMarker_400Regular",
                      marginTop: 8,
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
    bottom: 30,
    backgroundColor: "palegreen",
    width: 100,
    height: 40,
    zIndex: 2,
    borderRadius: 15,
    opacity: 0.8,
    paddingTop: -5,
  },
  slider: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    top: Constants.statusBarHeight + 10,
    width: "80%",
    height: 40,
    zIndex: 2,
    borderRadius: 15,
    opacity: 0.8,
    paddingBottom: 0,
    paddingTop: 10,
    backgroundColor: "white",
    paddingRight: "2%",
    paddingLeft: "2%",
  },
  monthText: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    top: Constants.statusBarHeight + 10,
    width: "10%",
    height: 20,
    zIndex: 3,
    borderRadius: 15,
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: "transparent",
    opacity: 0.8,
  },
  animalSelect: {
    position: "absolute",
    alignItems: "center",
    top: Constants.statusBarHeight + 45,
    width: 250,
    height: 18,
    zIndex: 2,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    opacity: 0.8,
    marginTop: 5,
    paddingTop: -7,
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
    bottom: 30,
    backgroundColor: "palegreen",
    width: 100,
    height: 40,
    zIndex: 2,
    borderRadius: 15,
    opacity: 0.8,
    paddingTop: -5,
  },
});
