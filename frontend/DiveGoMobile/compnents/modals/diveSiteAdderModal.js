import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { FontAwesome5 } from "@expo/vector-icons";
import { DSAdderContext } from "../contexts/DSModalContext";
import { insertDiveSiteWaits } from "../../axiosCalls/diveSiteWaitAxiosCalls";

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

  const { diveSiteAdderModal, setDiveSiteAdderModal } = useContext(DSAdderContext);

  const [formVals, setFormVals] = useState({
    Site: "",
    Latitude: "",
    Longitude: "",
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
            ...formVals,
            Latitude: location.coords.latitude.toString(),
            Longitude: location.coords.longitude.toString(),
          });
        }
      );
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  const handleSubmit = () => {

    if (formVals.Site === "" || formVals.Latitude == "" || formVals.Longitude == "") {
      return;
    } else {
      insertDiveSiteWaits(formVals);
      setFormVals({});
      setDiveSiteAdderModal(!diveSiteAdderModal)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={formVals.Site}
          placeholder={"Site Name"}
          placeholderTextColor="grey"
          onChangeText={(siteText) => setFormVals({...formVals, Site: siteText })}
        ></TextInput>

        <TextInput
          style={styles.input}
          value={formVals.Latitude}
          placeholder={"Latitude"}
          editable={false}
          placeholderTextColor="grey"
          color="black"
          onChangeText={(text) => setFormVals({ ...formVals, Latitude: text })}
        ></TextInput>

        <TextInput
          style={styles.input}
          value={formVals.Longitude}
          placeholder={"Longitude"}
          editable={false}
          placeholderTextColor="grey"
          color="black"
          onChangeText={(text) => setFormVals({ ...formVals, Longitude: text })}
        ></TextInput>
      </View>

      <TouchableWithoutFeedback onPress={CurrentCoords}>
        <View style={[styles.GPSbutton]}>
          <FontAwesome5 name="map" color="red" size={32} />
          <Text style={{ marginLeft: 5 }}>I'm At The Dive Site</Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.SubmitButton}>
      <TouchableWithoutFeedback onPress={handleSubmit}>
         <Text style={{ color: "blue", fontSize: 17, marginTop: 1 }}>Submit Dive Site</Text>
         </TouchableWithoutFeedback>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8DBE2",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 15,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: -240,
    justifyContent: "center",
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
  SubmitButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 15,
    marginLeft: 70,
    backgroundColor: "palegreen",
    borderEndColor: "green",
    borderWidth: 0.3,
    width: 160,
    height: 40,
    zIndex: 2,
    borderRadius: 15,
    opacity: 0.5,
  },
  inputContainerLower: {
    position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    width: '45%',
  },
});
