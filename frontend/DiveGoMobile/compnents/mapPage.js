import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Dimensions, Button } from "react-native";
import Map from "./GoogleMap";
import MonthSlider from "./slider";
import FABButtons from "./FABset";
import { DiveSitesContext } from "./contexts/diveSiteToggleContext";
import { MapCenterContext } from "./contexts/mapCenterContext";
import { PictureAdderContext } from "./contexts/picModalContext";
import { MasterContext } from "./contexts/masterContext";

export default function MapPage() {
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { picAdderModal, setPicAdderModal } = useContext(PictureAdderContext);

  const [diveSitesTog, setDiveSitesTog] = useState(true);
  const [mapCenter, setMapCenter] = useState({
    lat: 49.246292,
    lng: -123.116226,
  });

  const onNavigate = () => {
    setMasterSwitch(true);
    setPicAdderModal(!picAdderModal);
  }

  return (
    <MapCenterContext.Provider value={{ mapCenter, setMapCenter }}>
      <DiveSitesContext.Provider value={{ diveSitesTog, setDiveSitesTog }}>
        <View style={styles.container}>
          {masterSwitch && (
            <View style={styles.slider}>
              <MonthSlider style={{ zIndex: 2 }} />
            </View>
          )}
          {masterSwitch && (
            <View style={styles.Fbuttons}>
              <FABButtons style={{ zIndex: 2 }} />
            </View>
          )}

          {!masterSwitch && (
            <View style={styles.PinButton}>
              <Button title="Set Pin" onPress={onNavigate}/>
            </View>
          )}

          <Map style={{ zIndex: 1 }} />
        </View>
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
    top: 40,
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
  }
  
});
