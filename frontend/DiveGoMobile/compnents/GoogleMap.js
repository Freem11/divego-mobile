import React, { useState, useEffect, useContext } from "react";
import { DiveSitesContext } from "./contexts/diveSiteToggleContext";
import { MapCenterContext } from "./contexts/mapCenterContext";
import { MapBoundariesContext } from "./contexts/mapBoundariesContext";
import { MapRegionContext } from "./contexts/mapRegionContext";
import { MapZoomContext } from "./contexts/mapZoomContext";
import { MasterContext } from "./contexts/masterContext";
import { PinSpotContext } from "./contexts/pinSpotContext";
import { AnimalSelectContext } from "./contexts/animalSelectContext";
import { SliderContext } from "./contexts/sliderContext";
import MapView, { PROVIDER_GOOGLE, Marker, Heatmap } from "react-native-maps";
import { StyleSheet, View, Dimensions, Keyboard } from "react-native";
import { diveSitesFake, heatVals } from "./data/testdata";
import anchorIcon from "../compnents/png/anchor11.png";
import anchorClust from "../compnents/png/anchor3.png";
import whale from "../compnents/png/icons8-spouting-whale-48.png";
import { calculateZoom, formatHeatVals } from "./helpers/mapHelpers";
import { setupClusters } from "./helpers/clusterHelpers";
import useSupercluster from "use-supercluster";
import { diveSites } from "../axiosCalls/diveSiteAxiosCalls";
import { heatPoints } from "../axiosCalls/heatPointAxiosCalls";

const { width, height } = Dimensions.get("window");

export default function Map() {
  const { masterSwitch } = useContext(MasterContext);
  const { mapCenter, setMapCenter } = useContext(MapCenterContext);
  const { region, setRegion } = useContext(MapRegionContext);
  const [mapRef, setMapRef] = useState(null);
  const { boundaries, setBoundaries } = useContext(MapBoundariesContext);
  const [newSites, setnewSites] = useState([]);
  const [newHeat, setNewHeat] = useState([]);
  const { zoomlev, setZoomLev } = useContext(MapZoomContext);

  const { sliderVal } = useContext(SliderContext);
  const { animalSelection } = useContext(AnimalSelectContext);

  const { dragPin, setDragPin } = useContext(PinSpotContext);

  const { diveSitesTog } = useContext(DiveSitesContext);

  const handleMapChange = async () => {
    if (mapRef) {
      let bounds = await mapRef.getMapBoundaries();
      setBoundaries([
        bounds.southWest.longitude,
        bounds.southWest.latitude,
        bounds.northEast.longitude,
        bounds.northEast.latitude,
      ]);

      let filtered = await diveSites(bounds);
      !diveSitesTog ? setnewSites([]) : setnewSites(filtered);

      let filteredHeat = await heatPoints(bounds, sliderVal, animalSelection);
      setNewHeat(formatHeatVals(filteredHeat));

      let zoom = calculateZoom(
        width,
        bounds.northEast.longitude,
        bounds.southWest.longitude
      );
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
    handleMapChange();
  }, []);

  useEffect(() => {
    handleMapChange();
  }, [diveSitesTog, sliderVal, animalSelection]);

  useEffect(() => {
    setDragPin(mapCenter);
  }, [masterSwitch]);

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

  const points = setupClusters(newSites);

  const { clusters } = useSupercluster({
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
        provider="google"
        mapType="satellite"
        initialRegion={region}
        mapType={"satellite"}
        maxZoomLevel={12}
        minZoomLevel={3}
        ref={(ref) => setMapRef(ref)}
        onMapReady={() => handleMapChange()}
        onRegionChangeComplete={() => handleMapChange()}
      >
        {masterSwitch && newHeat.length > 0 && (
          <Heatmap points={newHeat} radius={20} />
        )}

        {!masterSwitch && (
          <Marker
            draggable={true}
            coordinate={{
              latitude: dragPin.lat,
              longitude: dragPin.lng,
            }}
            image={whale}
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
