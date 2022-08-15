import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function FABButtons() {
  const rotationVal = useSharedValue(0);
  const transYanchor = useSharedValue(0);
  const transYsearch = useSharedValue(0);
  const transYsite = useSharedValue(0);
  const transYphoto = useSharedValue(0);
  const transYgeo = useSharedValue(0);
  const transYinfo = useSharedValue(0);

  const rotation = useDerivedValue(() => {
    return interpolate(rotationVal.value, [0, 45], [0, 45]);
  });

  const animatedRotation = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value + "deg" }],
    };
  });

  const startButtonAnimations = () => {
    if (rotationVal.value === 45) {
      rotationVal.value = withSpring(0);
      transYanchor.value = withTiming(0);
      transYsearch.value = withTiming(0);
      transYsite.value = withTiming(0);
      transYphoto.value = withTiming(0);
      transYgeo.value = withTiming(0);
      transYinfo.value = withTiming(0);
    } else {
      rotationVal.value = withSpring(45);
      transYanchor.value = withSpring(-65);
      transYsearch.value = withSpring(-115);
      transYsite.value = withSpring(-165);
      transYphoto.value = withSpring(-215);
      transYgeo.value = withSpring(-265);
      transYinfo.value = withSpring(-315);
    }
  };

  const transAnchorY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transYanchor.value }],
    };
  });

  const transSearchY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transYsearch.value }],
    };
  });

  const transSiteY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transYsite.value }],
    };
  });

  const transPhotoY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transYphoto.value }],
    };
  });

  const transGeoY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transYgeo.value }],
    };
  });

  const transInfoY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transYinfo.value }],
    };
  });

  return (
    <View style={styles.fab}>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.buttonwrapper, styles.questionWrapper, transInfoY]}>
          <FontAwesome5 name="question" color="aquamarine" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.buttonwrapper, styles.exploreWrapper, transGeoY]}>
          <MaterialIcons name="explore" color="aquamarine" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.buttonwrapper, styles.cameraWrapper, transPhotoY]}>
          <MaterialIcons name="photo-camera" color="aquamarine" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.buttonwrapper, styles.addSiteWrapper, transSiteY]}>
          <MaterialIcons name="add-location-alt" color="aquamarine" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.buttonwrapper, styles.searchWrapper, transSearchY]}>
          <MaterialIcons name="search" color="aquamarine" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View
          style={[styles.buttonwrapper, styles.anchorWrapper, transAnchorY]}
        >
          <MaterialIcons name="anchor" color="aquamarine" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={startButtonAnimations}>
        <Animated.View
          style={[
            styles.topbuttonwrapper,
            styles.menuWrapper,
            animatedRotation,
          ]}
        >
          <FontAwesome5 name="plus" color="black" size={32} />
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
    bottom: 30,
    height: 10,
    width: 60,
    right: 20,
    backgroundColor: "transparent",
  },
  topbuttonwrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    height: 55,
    width: 55,
    opacity: 1,
    
  },
  buttonwrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    height: 45,
    width: 45,
    opacity: 1,
    backgroundColor: "black",
  },
  menuWrapper: {
    backgroundColor: "aquamarine",
    bottom: 0,
  },
  anchorWrapper: {
    bottom: 0,
  },
  searchWrapper: {
    bottom: 0,
  },
  addSiteWrapper: {
    bottom: 0,
  },
  cameraWrapper: {
    bottom: 0,
  },
  exploreWrapper: {
    bottom: 0,
  },
  questionWrapper: {
    bottom: 0,
  },
});
