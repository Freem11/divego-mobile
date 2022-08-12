import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Heatmap } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { diveSitesFake, heatVals } from "./data/testdata";
import anchorIcon from "../compnents/png/anchor11.png";
import anchorClust from "../compnents/png/anchor3.png";
import { filterSites, formatHeatVals } from "./helpers/mapHelpers";
import { setupClusters } from "./helpers/clusterHelpers";
import useSupercluster from "use-supercluster";

const { width, height } = Dimensions.get("window");

const INITIAL_POSITION = {
  latitude: 49.246292,
  longitude: -123.116226,
  latitudeDelta: 5,
  longitudeDelta: 5 * (width / height),
};

export default function Map() {
  const [mapRef, setMapRef] = useState(null);
  const [boundaries, setBoundaries] = useState([]);
  const [newSites, setnewSites] = useState([]);
  const [newHeat, setNewHeat] = useState([]);
  const [zoomlev, setZoomLev] = useState(INITIAL_POSITION.latitudeDelta);

  useEffect(() => {
    if (mapRef) {
      let bounds = mapRef.getMapBoundaries();
      Promise.all([bounds])
        .then((response) => {
          console.log("bounds", response[0])
          setBoundaries([response[0].southWest.longitude, response[0].southWest.latitude, response[0].northEast.longitude, response[0].northEast.latitude]);
          let filtered = filterSites(response[0], diveSitesFake);
          setnewSites(filtered);

          let filteredHeat = formatHeatVals(filterSites(response[0], heatVals));
          setNewHeat(filteredHeat);

          let zoom =
            Math.log2(
              (360 * (width / 256)) /
                (bounds.northEast.longitude - bounds.southWest.longitude)
            ) + 1;
          setZoomLev(zoom);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleMapChange = async () => {
    if (mapRef) {
      let bounds = await mapRef.getMapBoundaries();
      console.log("bounds", bounds)
      setBoundaries([bounds.southWest.longitude, bounds.southWest.latitude, bounds.northEast.longitude, bounds.northEast.latitude]);
      let filtered = filterSites(bounds, diveSitesFake);
      setnewSites(filtered);

      let filteredHeat = formatHeatVals(filterSites(bounds, heatVals));
      setNewHeat(filteredHeat);

      let zoom =
        Math.log2(
          (360 * (width / 256)) /
            (bounds.northEast.longitude - bounds.southWest.longitude)
        ) + 1;
      setZoomLev(zoom);
    }
  };
 
  const points = setupClusters(newSites);
  console.log("zlev", points);
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: boundaries,
    zoom: zoomlev,
    options: { radius: 75, maxZoom: 12 },
  });

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
        onMapReady={() => handleMapChange()}
        onRegionChangeComplete={() => handleMapChange()}
      >
        <Heatmap points={newHeat} radius={20} />

        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          if (isCluster) {
            return(
              <Marker
                key={cluster.id}
                coordinate={{ latitude: latitude, longitude: longitude }}
                title={pointCount.toString() + " sites"}
                image={anchorClust}
              >
              </Marker>
           )
          }
            return(
            <Marker
              key={cluster.properties.siteID}
              coordinate={{ latitude: latitude, longitude: longitude }}
              image={anchorIcon}
              title={cluster.properties.siteID}
            ></Marker>
            )
        })}
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
