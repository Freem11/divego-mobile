import React, { useState, useEffect, useContext } from "react";
import { DiveSitesContext } from "./contexts/diveSiteToggleContext";
import { MapCenterContext } from "./contexts/mapCenterContext";
import { MapBoundariesContext } from "./contexts/mapBoundariesContext";
import { MapRegionContext } from "./contexts/mapRegionContext";
import { MapZoomContext } from "./contexts/mapZoomContext";
import { MasterContext } from "./contexts/masterContext";
import { PinSpotContext } from "./contexts/pinSpotContext";
import MapView, { PROVIDER_GOOGLE, Marker, Heatmap } from "react-native-maps";
import { StyleSheet, View, Dimensions, Keyboard, Button } from "react-native";
import { diveSitesFake, heatVals } from "./data/testdata";
import anchorIcon from "../compnents/png/anchor11.png";
import anchorClust from "../compnents/png/anchor3.png";
import whale from "../compnents/png/icons8-spouting-whale-48.png";
import { filterSites, formatHeatVals } from "./helpers/mapHelpers";
import { setupClusters } from "./helpers/clusterHelpers";
import useSupercluster from "use-supercluster";
import { useMediaLibraryPermissions } from "expo-image-picker";

const { width, height } = Dimensions.get("window");

export default function Map() {
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { mapCenter, setMapCenter } = useContext(MapCenterContext);

  useEffect(() => {
    if (mapRef) {
      mapRef.animateCamera({
        center: {
          latitude: mapCenter.lat,
          longitude: mapCenter.lng,
        },
      });
      Keyboard.dismiss();
    }
  }, [mapCenter]);

  const { region, setRegion } = useContext(MapRegionContext);
  const [mapRef, setMapRef] = useState(null);
  const { boundaries, setBoundaries } = useContext(MapBoundariesContext);
  const [newSites, setnewSites] = useState([]);
  const [newHeat, setNewHeat] = useState([]);
  const { zoomlev, setZoomLev } = useContext(MapZoomContext);

  const { dragPin, setDragPin } = useContext(PinSpotContext);

  const { diveSitesTog, setDiveSitesTog } = useContext(DiveSitesContext);

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

          if (filtered) {
            !diveSitesTog ? setnewSites([]) : setnewSites(filtered);
          }

          let filteredHeat = formatHeatVals(filterSites(response[0], heatVals));
          setNewHeat(filteredHeat);

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
              response[0].northEast.latitude - response[0].southWest.latitude,
            longitudeDelta:
              response[0].northEast.longitude - response[0].southWest.longitude,
          });
        })
        .catch((error) => {
          console.log(error);
        });

      setDragPin({
        latitude: response1.center.latitude,
        longitude: response1.center.longitude,
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

      if (filtered) {
        !diveSitesTog ? setnewSites([]) : setnewSites(filtered);
      }

      let filteredHeat = formatHeatVals(filterSites(bounds, heatVals));
      setNewHeat(filteredHeat);

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

      setMapCenter({
        lat: mapbullseye.center.latitude,
        lng: mapbullseye.center.longitude,
      });
    }
  };

  useEffect(() => {
    if (mapRef) {
      let bounds = mapRef.getMapBoundaries();
      Promise.all([bounds]).then((response) => {
        setBoundaries([
          response[0].southWest.longitude,
          response[0].southWest.latitude,
          response[0].northEast.longitude,
          response[0].northEast.latitude,
        ]);
        let filtered = filterSites(response[0], diveSitesFake);

        if (filtered) {
          !diveSitesTog ? setnewSites([]) : setnewSites(filtered);
        }
      });
    }
  }, [diveSitesTog]);

  useEffect(() => {
    setDragPin(mapCenter);
  }, [masterSwitch]);

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
        {masterSwitch && <Heatmap points={newHeat} radius={20} />}

        {!masterSwitch && (
          <Marker
            draggable={true}
            coordinate={{
              latitude: dragPin.lat,
              longitude: dragPin.lng,
            }}
            image={whale}
            onDragStart={(e) => {
              console.log(e.nativeEvent.coordinate);
            }}
            onDragEnd={(e) => {
              setDragPin({
                lat: e.nativeEvent.coordinate.latitude,
                lng: e.nativeEvent.coordinate.longitude,
              });
            }}
          />
        )}

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
