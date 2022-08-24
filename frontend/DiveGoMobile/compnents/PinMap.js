import React, { useState, useEffect, useContext } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { diveSitesFake } from "./data/testdata";
import anchorIcon from "../compnents/png/anchor11.png";
import anchorClust from "../compnents/png/anchor3.png";
import { filterSites } from "./helpers/mapHelpers";
import { setupClusters } from "./helpers/clusterHelpers";
import useSupercluster from "use-supercluster";
import { MapCenterContext } from "./contexts/mapCenterContext";
import { MapBoundariesContext } from "./contexts/mapBoundariesContext";
import { MapRegionContext } from "./contexts/mapRegionContext";
import { MapZoomContext } from "./contexts/mapZoomContext";

const { width, height } = Dimensions.get("window");

export default function PinMap() {
  const { mapCenter } = useContext(MapCenterContext);
  const { region, setRegion } = useContext(MapRegionContext);
  const [mapRef, setMapRef] = useState(null);
  const { boundaries, setBoundaries } = useContext(MapBoundariesContext);
  const [newSites, setnewSites] = useState([]);
  const { zoomlev, setZoomLev } = useContext(MapZoomContext);

  useEffect(() => {
    if (mapRef) {
      let bounds = mapRef.getMapBoundaries();
      Promise.all([bounds])
        .then((response) => {
          setBoundaries([
            response[0].southWest.longitude,
            response[0].southWest.latitude,
            response[0].northEast.longitude,
            response[0].northEast.latitude,
          ]);
          let filtered = filterSites(response[0], diveSitesFake);
          setnewSites(filtered);

          let zoom =
            Math.log2(
              (360 * (width / 256)) /
                (response[0].northEast.longitude -
                  response[0].southWest.longitude)
            ) + 1;
          setZoomLev(zoom);
        })
        .catch((error) => {
          console.log(error);
        });

      let mapbullseye = mapRef.getCamera();
      Promise.all([mapbullseye])
        .then((response1) => {
          setRegion({
            latitude: response1.center.latitude,
            longitude: response1.center.longitude,
            latitudeDelta:
              response.northEast.latitude - response.southWest.latitude,
            longitudeDelta:
              response.northEast.longitude - response.southWest.longitude,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleMapChange = async () => {
    if (mapRef) {
      let bounds = await mapRef.getMapBoundaries();
      setBoundaries([
        bounds.southWest.longitude,
        bounds.southWest.latitude,
        bounds.northEast.longitude,
        bounds.northEast.latitude,
      ]);
      let filtered = filterSites(bounds, diveSitesFake);
      setnewSites(filtered);

      let zoom =
        Math.log2(
          (360 * (width / 256)) /
            (bounds.northEast.longitude - bounds.southWest.longitude)
        ) + 1;
      setZoomLev(zoom);

      let mapbullseye = await mapRef.getCamera();
      setRegion({
        latitude: mapbullseye.center.latitude,
        longitude: mapbullseye.center.longitude,
        latitudeDelta: bounds.northEast.latitude - bounds.southWest.latitude,
        longitudeDelta: bounds.northEast.longitude - bounds.southWest.longitude,
      });
    }
  };

  const points = setupClusters(newSites);

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
        initialRegion={region}
        mapType="satellite"
        maxZoomLevel={12}
        minZoomLevel={3}
        ref={(ref) => setMapRef(ref)}
        onMapReady={() => handleMapChange()}
        onRegionChangeComplete={() => handleMapChange()}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={cluster.id}
                coordinate={{ latitude: latitude, longitude: longitude }}
                title={pointCount.toString() + " sites"}
                image={anchorClust}
              ></Marker>
            );
          }
          return (
            <Marker
              key={cluster.properties.siteID}
              coordinate={{ latitude: latitude, longitude: longitude }}
              image={anchorIcon}
              title={cluster.properties.siteID}
            ></Marker>
          );
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
