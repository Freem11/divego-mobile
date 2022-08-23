import React, { useState } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapPage from "./mapPage";
import PinMapPage from "./pinMapPage";

export default function StackNav() {
  
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false} }>
      <Stack.Group>
        <Stack.Screen name="MapPage" component={MapPage} />
        <Stack.Screen name="PinMapPage" component={PinMapPage} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
