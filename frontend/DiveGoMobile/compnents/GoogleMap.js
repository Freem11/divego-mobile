import * as React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const INITIAL_POSITION = {
  latitude: 49.246292,
  longitude: -123.116226,
  latitudeDelta: 5,
  longitudeDelta: 5 * (width / height),
};

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
      />
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
