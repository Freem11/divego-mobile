import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { DSAdderContext } from "../contexts/DSModalContext";
import { insertDiveSiteWaits } from "../../supabaseCalls/diveSiteWaitSupabaseCalls";
// import { insertDiveSiteWaits } from "../../axiosCalls/diveSiteWaitAxiosCalls";
import { getCurrentCoordinates } from "../helpers/permissionsHelpers";
import { userCheck } from "../../supabaseCalls/authenticateSupabaseCalls";


let SiteNameVar = false;
let LatVar = false;
let LngVar = false;

export default function DiveSiteModal() {
  const { diveSiteAdderModal, setDiveSiteAdderModal } = useContext(
    DSAdderContext
  );

  const [formVals, setFormVals] = useState({
    Site: "",
    Latitude: "",
    Longitude: "",
    UserID: "",
  });

  const [formValidation, SetFormValidation] = useState({
    SiteNameVal: false,
    LatVal: false,
    LngVal: false,
  });

  let UserId;

  useEffect(() => {
    const getUser = async () => {
      UserId = await userCheck();
      setFormVals({ ...formVals, UserID: UserId.id });
    };
  
    getUser();
  }, []);

  console.log("narg", formVals)

  const getCurrentLocation = async () => {
    try {
      const location = await getCurrentCoordinates();
      if (location) {
        setFormVals({
          ...formVals,
          Latitude: location.coords.latitude.toString(),
          Longitude: location.coords.longitude.toString(),
        });
        SetFormValidation({
          ...formValidation,
          SiteNameVal: false,
          LatVal: false,
          LngVal: false,
        });
      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  const handleSubmit = () => {

    if (formVals.Site === "" || formVals.Site === null) {
      SiteNameVar = true;
    } else {
      SiteNameVar = false;
    }

    if (formVals.Latitude === "" || formVals.Latitude === null) {
      LatVar = true;
    } else {
      LatVar = false;
    }

    if (formVals.Longitude === "" || formVals.Longitude === null) {
      LngVar = true;
    } else {
      LngVar = false;
    }

    SetFormValidation({
      ...formValidation,
      SiteNameVal: SiteNameVar,
      LatVal: LatVar,
      LngVal: LngVar,
    });

    if (
      formVals.Site === "" ||
      formVals.Latitude == "" ||
      formVals.Longitude == ""
    ) {
      return;
    } else {
      insertDiveSiteWaits(formVals);
      setFormVals({});
      setDiveSiteAdderModal(!diveSiteAdderModal);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={formValidation.SiteNameVal ? styles.inputRed : styles.input}
          value={formVals.Site}
          placeholder={"Site Name"}
          placeholderTextColor="grey"
          color="#F0EEEB"
          fontSize={18}
          onChangeText={(siteText) =>
            setFormVals({ ...formVals, Site: siteText })
          }
        ></TextInput>

        <TextInput
          style={formValidation.LatVal ? styles.inputRed : styles.input}
          value={formVals.Latitude}
          placeholder={"Latitude"}
          editable={false}
          fontSize={18}
          placeholderTextColor="grey"
          color="#F0EEEB"
          onChangeText={(text) => setFormVals({ ...formVals, Latitude: text })}
        ></TextInput>

        <TextInput
          style={formValidation.LngVal ? styles.inputRed : styles.input}
          value={formVals.Longitude}
          placeholder={"Longitude"}
          editable={false}
          fontSize={18}
          placeholderTextColor="grey"
          color="#F0EEEB"
          onChangeText={(text) => setFormVals({ ...formVals, Longitude: text })}
        ></TextInput>
      </View>

      <TouchableWithoutFeedback onPress={getCurrentLocation}>
        <View style={[styles.GPSbutton]}>
          <FontAwesome5 name="map" color="#9B884E" size={28} />
          <Text
            style={{
              marginLeft: 5,
              fontFamily: "Caveat_700Bold",
              color: "#9B884E",
            }}
          >
            I'm At The Dive Site
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.SubmitButton}>
        <TouchableWithoutFeedback onPress={handleSubmit}>
          <Text
            style={{
              color: "#9B884E",
              fontSize: 17,
              marginTop: 8,
              fontFamily: "PermanentMarker_400Regular",
              width: "100%",
              alignSelf: "center",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center"
            }}
          >
            Submit Dive Site
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#355D71",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: 15,
    width: '100%',
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontFamily: "IndieFlower_400Regular",
    backgroundColor: "#33586A",
    borderRadius: 10,
    width: 200,
    height: 40,
    alignSelf: "center",
    marginBottom: 20,
    textAlign: "center",
    overflow: "hidden",
  },
  inputRed: {
    fontFamily: "IndieFlower_400Regular",
    backgroundColor: "pink",
    borderRadius: 10,
    width: 200,
    height: 40,
    alignSelf: "center",
    marginBottom: 20,
    textAlign: "center",
    overflow: "hidden",
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
    backgroundColor: "#33586A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 35,
    width: 150,
    marginLeft: "30%",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  SubmitButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: "4%",
    marginLeft: 70,
    borderWidth: 0.3,
    zIndex: 2,
    width: '85%',
    borderTopColor: "darkgrey",
    borderColor: "transparent",
    borderBottomColor: "transparent",
    bottom: "1%",
  },
  inputContainerLower: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    width: "45%",
  },
});
