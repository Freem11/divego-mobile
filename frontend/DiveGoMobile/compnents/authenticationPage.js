import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useState, useContext } from "react";
import { SessionContext } from "./contexts/sessionContext";
import { register, sessionCheck, signInStandard, userCheck } from "../supabaseCalls/authenticateSupabaseCalls";

let emailVar = false;
let passwordVar = false;
let firstVar = false;
let lastVar = false;

export default function AuthenticationPage() {

  const { activeSession, setActiveSession } = useContext(SessionContext);

  const [formVals, setFormVals] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [formValidation, SetFormValidation] = useState({
    emailVal: false,
    passwordVal: false,
  });

  const handleSignInSubmit = async () => {
    if (formVals.email === "" || formVals.email === null) {
      emailVar = true;
    } else {
      emailVar = false;
    }

    if (formVals.password === "" || formVals.password === null) {
      passwordVar = true;
    } else {
      passwordVar = false;
    }

    SetFormValidation({
      ...formValidation,
      emailVal: emailVar,
      passwordVal: passwordVar,
    });

    if (formVals.email === "" || formVals.password == "") {
      return;
    } else {

      let accessToken =  await signInStandard(formVals)
       if (accessToken){
        await AsyncStorage.setItem('token', JSON.stringify(accessToken))
       } 
       let checker = await sessionCheck()
       let pecker = await userCheck()
       console.log("checkerbox", checker)
       console.log("peckerbox", pecker)
    }
  };

  const handleSignUpSubmit = async () => {
    if (formVals.email === "" || formVals.email === null) {
      emailVar = true;
    } else {
      emailVar = false;
    }

    if (formVals.password === "" || formVals.password === null) {
      passwordVar = true;
    } else {
      passwordVar = false;
    }

    if (formVals.firstName === "" || formVals.firstName === null) {
      firstVar = true;
    } else {
      firstVar = false;
    }

    if (formVals.lastName === "" || formVals.lastName === null) {
      lastVar = true;
    } else {
      lastVar = false;
    }

    SetFormValidation({
      ...formValidation,
      emailVal: emailVar,
      passwordVal: passwordVar,
      firstNameVal: firstVar,
      lastNameVal: lastVar,
    });

    if (
      formVals.email === "" ||
      formVals.password == "" ||
      formVals.firstName == "" ||
      formVals.lastName == ""
    ) {
      return;
    } else {
      register(formVals)
      let checkSess = sessionCheck()
      if (checkSess){
        try {
         await AsyncStorage.setItem('loggedIn', checkSess)
      } catch(error) {
        console.log("huh", error)
      };
      }
      
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={formValidation.emailVal ? styles.inputRed : styles.input}
          value={formVals.email}
          placeholder={"Email"}
          placeholderTextColor="grey"
          color="#F0EEEB"
          fontSize={18}
          onChangeText={(emailText) =>
            setFormVals({ ...formVals, email: emailText })
          }
        ></TextInput>

        <TextInput
          style={formValidation.passwordVal ? styles.inputRed : styles.input}
          value={formVals.password}
          placeholder={"Password"}
          fontSize={18}
          placeholderTextColor="grey"
          color="#F0EEEB"
          onChangeText={(passwordText) =>
            setFormVals({ ...formVals, password: passwordText })
          }
        ></TextInput>

        <TextInput
          style={formValidation.firstNameVal ? styles.inputRed : styles.input}
          value={formVals.firstName}
          placeholder={"First Name"}
          fontSize={18}
          placeholderTextColor="grey"
          color="#F0EEEB"
          onChangeText={(firstText) =>
            setFormVals({ ...formVals, firstName: firstText })
          }
        ></TextInput>

        <TextInput
          style={formValidation.lastNameVal ? styles.inputRed : styles.input}
          value={formVals.lastName}
          placeholder={"Last Name"}
          fontSize={18}
          placeholderTextColor="grey"
          color="#F0EEEB"
          onChangeText={(lastText) =>
            setFormVals({ ...formVals, lastName: lastText })
          }
        ></TextInput>
      </View>

      <View style={styles.SubmitButton2}>
        <TouchableWithoutFeedback onPress={handleSignInSubmit}>
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
              textAlign: "center",
            }}
          >
            Sign In
          </Text>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.SubmitButton}>
        <TouchableWithoutFeedback onPress={handleSignUpSubmit}>
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
              textAlign: "center",
            }}
          >
            Sign Up
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
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30%"
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
  text: {
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 5,
  },
  SubmitButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: "2%",
    marginLeft: 70,
    borderWidth: 0.3,
    zIndex: 2,
    width: "85%",
    borderTopColor: "darkgrey",
    borderColor: "transparent",
    borderBottomColor: "transparent",
  },
  SubmitButton2: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: "10%",
    marginLeft: 70,
    borderWidth: 0.3,
    zIndex: 2,
    width: "85%",
    borderTopColor: "darkgrey",
    borderColor: "transparent",
    borderBottomColor: "transparent",
  },
});
