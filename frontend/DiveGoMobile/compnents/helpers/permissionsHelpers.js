import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

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
    if (forground.granted) await Location.requestBackgroundPermissionsAsync();
  } catch (e) {
    console.log({ title: "Error", message: e.message });
  }
};

const getCurrentCoordinates = async () => {
  requestPermissions();

  const { granted } = await Location.getForegroundPermissionsAsync();

  if (!granted) {
    console.log("location tracking denied");
  }
  foregroundSubscription?.remove();

  let myLocation = await Location.getCurrentPositionAsync({});
  return myLocation;
};

export { getCurrentCoordinates };
