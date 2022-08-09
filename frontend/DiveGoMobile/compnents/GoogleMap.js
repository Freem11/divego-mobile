import * as React from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Heatmap } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { diveSitesFake, heatVals } from "./data/testdata";
import anchorIcon from "../compnents/png/anchor11.png";

const { width, height } = Dimensions.get("window");

const INITIAL_POSITION = {
  latitude: 49.246292,
  longitude: -123.116226,
  latitudeDelta: 5,
  longitudeDelta: 5 * (width / height),
};

function formatHeatVals(heatValues) {
  let newArr = [];
  heatValues.forEach((heatPoint) => {
    let newpt = {
      latitude: heatPoint.lat,
      longitude: heatPoint.lng,
      weight: heatPoint.weight,
    };
    newArr.push(newpt);
  });
  return newArr;
}

let heatPoints = formatHeatVals(heatVals);

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        mapType="satellite"
        maxZoomLevel={12}
        minZoomLevel={3}
      >
        {diveSitesFake.map((diveSite, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: diveSite.lat, longitude: diveSite.lng }}
              title={diveSite.name}
              image={anchorIcon}
            />
        ))}
        <Heatmap 
        points={heatPoints}
        radius={20}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
