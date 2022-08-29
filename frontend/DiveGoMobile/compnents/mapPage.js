import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
} from "react-native";
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

export default function MapPage() {
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { dragPin, setDragPin } = useContext(PinSpotContext);
  const { pinValues, setPinValues } = useContext(PinContext);

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
const [token, setToken] = useState(false)

  useEffect(() => {
    
    if(pinValues.Animal.length > 0){
      setToken(true)
  } else {
      setToken(false)
  }

  }, [pinValues.Animal])


  return (
    <MapCenterContext.Provider value={{ mapCenter, setMapCenter }}>
      <DiveSitesContext.Provider value={{ diveSitesTog, setDiveSitesTog }}>
        <KeyboardAvoidingView style={styles.container} behavior="height">
          {masterSwitch && (
            <View style={styles.slider}>
              <MonthSlider style={{ zIndex: 2 }} />
            </View>
          )}
          {masterSwitch && (
            <View style={styles.animalSelect}>
                {token && (
                  <Text>Selected:{pinValues.Animal}</Text>
                )}
                {!token && (
                  <Text>Selected: All</Text>
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
              <Button title="Set Pin" onPress={onNavigate} />
            </View>
          )}
          <Logo style={styles.Logo} />
          <Map style={{ zIndex: 1 }} />
        </KeyboardAvoidingView>
      </DiveSitesContext.Provider>
    </MapCenterContext.Provider>
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
    position: "absolute",
    alignItems: "center",
    top: 10,
    width: 100,
    height: 40,
    zIndex: 2,
    borderRadius: 15,
    opacity: 0.8,
    paddingTop: -5,
  },
  animalSelect: {
    position: "absolute",
    alignItems: "center",
    top: 90,
    width: 250,
    height: 17,
    zIndex: 2,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    opacity: 0.5,
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
