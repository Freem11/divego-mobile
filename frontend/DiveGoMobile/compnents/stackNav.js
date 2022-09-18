import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapPage from "./mapPage";


export default function StackNav() {
  
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false} }>
      <Stack.Group>
        <Stack.Screen name="MapPage" component={MapPage} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
