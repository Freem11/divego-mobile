import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Animated, { useSharedValue, interpolate, useAnimatedStyle, useDerivedValue, withSpring, withTiming } from "react-native-reanimated";

export default function FABButtons() {
  const rotationVal = useSharedValue(0);

  const rotation = useDerivedValue(() => {
    return interpolate(rotationVal.value,
        [0,45],
        [0,45])  
  })

  const animatedRotation = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: rotation.value + 'deg'}
      ]
    }
  })


const startRotation = () => {
  if (rotationVal.value === 45) {
    rotationVal.value = withSpring(0)
  } else {
    rotationVal.value = withSpring(45)
  }
  
}

 
  return (
    <View style={styles.fab}>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.buttonwrapper, styles.questionWrapper]}>
          <FontAwesome5 name="question" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.buttonwrapper, styles.exploreWrapper]}>
          <MaterialIcons name="explore" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.buttonwrapper, styles.cameraWrapper]}>
          <MaterialIcons name="photo-camera" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.buttonwrapper, styles.addSiteWrapper]}>
          <MaterialIcons name="add-location-alt" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.buttonwrapper, styles.searchWrapper]}>
          <MaterialIcons name="search" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.buttonwrapper, styles.anchorWrapper]}>
          <MaterialIcons name="anchor" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={startRotation}>
        <Animated.View
          style={[
            styles.buttonwrapper,
            styles.menuWrapper,
            animatedRotation
          ]}
        >
          <FontAwesome5 name="plus" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    zIndex: 2,
    bottom: 20,
    height: 10,
    width: 60,
    backgroundColor: "transparent",
  },
  buttonwrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    height: 55,
    width: 55,
    opacity: 0.7,
  },
  menuWrapper: {
    backgroundColor: "aquamarine",
    bottom: 0,
  },
  anchorWrapper: {
    backgroundColor: "lightblue",
    bottom: 60,
  },
  searchWrapper: {
    backgroundColor: "yellow",
    bottom: 120,
  },
  addSiteWrapper: {
    backgroundColor: "orange",
    bottom: 180,
  },
  cameraWrapper: {
    backgroundColor: "purple",
    bottom: 240,
  },
  exploreWrapper: {
    backgroundColor: "gold",
    bottom: 300,
  },
  questionWrapper: {
    backgroundColor: "palegreen",
    bottom: 360,
  },
});
