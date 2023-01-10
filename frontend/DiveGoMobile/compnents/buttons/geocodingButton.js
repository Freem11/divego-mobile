import React, { useState, useContext } from "react";
import { MaterialIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import GeocodeAutocomplete from "../geocodeAutocomplete";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scale } from "react-native-size-matters";

export default function GeoCodingButtonCollection() {

  const geocodeWidth = useSharedValue(-1000);

  // const scaleGeo = useDerivedValue(() => {
  //   return interpolate(geocodeWidth.value, [0, 200], [0, 1]);
  // });

  const geocodeReveal = useAnimatedStyle(() => {
    return {
      // transform: [{ scaleX: -scaleGeo.value }],
      transform: [{ translateX: geocodeWidth.value }],
    };
  });

  const startGeoCodeButtonAnimations = () => {
    if (geocodeWidth.value === -1000) {
      geocodeWidth.value = withTiming(0);
    } else {
      geocodeWidth.value = withTiming(-1000);
    }
  };

  return (
    <View style={styles.fab}>
      <TouchableWithoutFeedback onPress={startGeoCodeButtonAnimations}>
        <View style={styles.button}>
        <MaterialIcons name="explore" color="aquamarine" size={32} />
        </View>
      </TouchableWithoutFeedback>

     
         <Animated.View style={[styles.geoCoder, geocodeReveal]}>
          <GeocodeAutocomplete />
        </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 10,
    width: 1000,
    backgroundColor: "transparent",
    zIndex: 2,
    transform: [{ scaleX: -1 }],
    // marginRight: 300
  },
  geoCoder: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    bottom: 135,
    height: 40,
    right: 40,
    borderRadius: 10,
    zIndex: 2,
    marginRight: -355
  },
  button: {
    marginTop: 30,
    height: 45,
    width: 45,
    borderRadius: 45/2,
    opacity: 0.7,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  }
})
