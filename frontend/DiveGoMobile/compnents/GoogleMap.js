import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Heatmap } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { diveSitesFake, heatVals } from "./data/testdata";
import anchorIcon from "../compnents/png/anchor11.png";
import { filterSites, formatHeatVals } from "./helpers/mapHelpers";

const { width, height } = Dimensions.get("window");

const INITIAL_POSITION = {
  latitude: 49.246292,
  longitude: -123.116226,
  latitudeDelta: 5,
  longitudeDelta: 5 * (width / height),
};

let heatPoints = formatHeatVals(heatVals);

export default function Map() {

  const [mapRef, setMapRef] = useState(null);
  const [boundaries, setBoundaries] = useState(null);
  const [newSites, setnewSites] = useState([]);
  const [newHeat, setNewHeat] = useState([]);

  useEffect(() => {
    if (mapRef) {
      let bounds = mapRef.getMapBoundaries()
      Promise.all([bounds])
          .then((response) => {
            setBoundaries(response[0])
            let filtered =filterSites(response[0], diveSitesFake)
            setnewSites(filtered)

            let filteredHeat = formatHeatVals(filterSites(response[0], heatVals))
            setNewHeat(filteredHeat)

          })
          .catch((error) => {
            console.log(error);
          });
    }
  }, []);

  const handleMapChange = async () => {
    if (mapRef) {
      let bounds = await mapRef.getMapBoundaries()
      setBoundaries(bounds)
      let filtered = filterSites(bounds, diveSitesFake)
      setnewSites(filtered)

      let filteredHeat = formatHeatVals(filterSites(bounds, heatVals))
      setNewHeat(filteredHeat)
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        mapType="satellite"
        maxZoomLevel={12}
        minZoomLevel={3}
        ref={(ref) => setMapRef(ref)}
        onMapReady={()=> handleMapChange()}
        onRegionChangeComplete={() => handleMapChange()}
      >
        {newSites.map((diveSite, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: diveSite.lat, longitude: diveSite.lng }}
            title={diveSite.name}
            image={anchorIcon}
          />
        ))}
        <Heatmap points={newHeat} radius={20} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
