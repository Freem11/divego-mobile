import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { FontAwesome5 } from "@expo/vector-icons";

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

export default function DiveSiteModal() {
  const [formVals, setFormVals] = useState({
    siteName: "",
    latitude: "",
    longitude: "",
  });

  const CurrentCoords = async () => {
    const requestPermissions = async () => {
      try {
        const forground = await Location.requestForegroundPermissionsAsync();
        if (forground.granted)
          await Location.requestBackgroundPermissionsAsync();
      } catch (e) {
        console.log({ title: "Error", message: e.message });
      }
    };
    requestPermissions();

    const { granted } = await Location.getForegroundPermissionsAsync();

    if (!granted) {
      console.log("location tracking denied");
      return;
    }
    foregroundSubscription?.remove();

    try {
      return await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
        },
        (location) => {
          setFormVals({
            ...setFormVals,
            latitude: location.coords.latitude.toString(),
            longitude: location.coords.longitude.toString(),
          });
        }
      );
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={formVals.siteName}
          placeholder={"Site Name"}
          placeholderTextColor="grey"
          onChangeText={(text) => setFormVals({ ...formVals, siteName: text })}
        ></TextInput>

        <TextInput
          style={styles.input}
          value={formVals.latitude}
          placeholder={"Latitude"}
          placeholderTextColor="grey"
          onChangeText={(text) => setFormVals({ ...formVals, latitude: text })}
        ></TextInput>

        <TextInput
          style={styles.input}
          value={formVals.longitude}
          placeholder={"Longitude"}
          placeholderTextColor="grey"
          onChangeText={(text) => setFormVals({ ...formVals, longitude: text })}
        ></TextInput>
      </View>

      <TouchableWithoutFeedback onPress={CurrentCoords}>
        <View style={[styles.GPSbutton]}>
          <FontAwesome5 name="map" color="red" size={32} />
          <Text style={{ marginLeft: 5 }}>I'm At The Dive Site</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8DBE2",
    alignItems: "left",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 15,
  },
  inputContainer: {
    width: "100%",
    alignItems: 'center',
    marginTop: -240,
    justifyContent: "center"
    
  },
  input: {
    backgroundColor: "white",
    borderRadius: 15,
    width: 200,
    height: 40,
    alignSelf: "center",
    marginBottom: 20,
    textAlign: "center",
  },
  header: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 25,
    marginTop: -150,
  },
  text: {
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 5,
  },
  GPSbutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    height: 45,
    width: 75,
    marginLeft: 195,
    marginTop: 5,
  },
});
