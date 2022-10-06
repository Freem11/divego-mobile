import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import React, { useMemo } from "react";

const LOCATION_TASK_NAME = "LOCATION_TASK_NAME";
let foregroundSubscription = null;

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log("error", error);
    return;
  }
  if (data) {
    const { locations } = data;
    const location = locations[0];
    if (location) {
      console.log("background location", location.coords);
    }
  }
});

const requestPermissions = async () => {
  try {
    const forground = await Location.requestForegroundPermissionsAsync();
    return forground.granted
    // if (forground.granted) {
    //   let stuff = await Location.requestBackgroundPermissionsAsync();
    //   return stuff
    // }
  } catch (e) {
    console.log({ title: "Error", message: e.message });
  }
};

const getCurrentCoordinates = async() => {
  
  const { granted } = await Location.getForegroundPermissionsAsync();

  if (!granted) {
    requestPermissions();
    console.log("location tracking denied");
  }
  foregroundSubscription?.remove();

  try {
    return await Location.getCurrentPositionAsync({});
  } catch (e) {
    console.log("Location tracking error");
  }
};

export { getCurrentCoordinates };
