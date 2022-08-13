import React, { useState } from "react";
import { StyleSheet, Animated, View } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function FABButtons() {
  return (
    <View style={styles.fab}>
      <View style={[styles.buttonwrapper, styles.questionWrapper]}>
        <FontAwesome5 name="question" size={32} />
      </View>

      <View style={[styles.buttonwrapper, styles.exploreWrapper]}>
        <MaterialIcons name="explore" size={32} />
      </View>

      <View style={[styles.buttonwrapper, styles.cameraWrapper]}>
        <MaterialIcons name="photo-camera" size={32} />
      </View>

      <View style={[styles.buttonwrapper, styles.addSiteWrapper]}>
        <MaterialIcons name="add-location-alt" size={32} />
      </View>

      <View style={[styles.buttonwrapper, styles.searchWrapper]}>
        <MaterialIcons name="search" size={32} />
      </View>

      <View style={[styles.buttonwrapper, styles.anchorWrapper]}>
        <MaterialIcons name="anchor" size={32} />
      </View>

      <View style={[styles.buttonwrapper, styles.menuWrapper]}>
        <FontAwesome5 name="plus" size={32}/>
      </View>
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
    height: 55,
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
    backgroundColor: "tope",
    bottom: 360,
  },
});
