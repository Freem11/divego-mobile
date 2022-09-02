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
import { AnimalSelectContext } from "./contexts/animalSelectContext";

export default function MapPage() {
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { dragPin, setDragPin } = useContext(PinSpotContext);
  const { pinValues, setPinValues } = useContext(PinContext);
  const { animalSelection, setAnimalSelection } = useContext(AnimalSelectContext);

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

      if(animalSelection.length > 0){
        setToken(true)
    } else {
        setToken(false)
    }
    
 

  }, [animalSelection])


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
                  <Text>Selected: {animalSelection}</Text>
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
    flex: 1,
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
    top: 80,
    width: 250,
    height: 16,
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
