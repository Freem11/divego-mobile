import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Logo() {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Caveat_400Regular" }}>DiveGo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    backgroundColor: "white",
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    bottom: 0,
    left: 0,
    height: 33,
    borderTopRightRadius: 15,
    width: 80,
    paddingRight: 10,
    paddingTop: -10,
  },
});
