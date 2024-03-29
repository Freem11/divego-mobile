import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useContext, useEffect } from "react";
import { SessionContext } from "./contexts/sessionContext";
import {
  sessionCheck,
  signInStandard,
  register,
} from "../supabaseCalls/authenticateSupabaseCalls";
import { scale } from "react-native-size-matters";
import InsetShadow from "react-native-inset-shadow";
import facebookLogo from "../compnents/png/facebook.png";
import googleLogo from "../compnents/png/google.png";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import config from "../config";
import Headliner from "../compnents/png/Headliner.png"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

WebBrowser.maybeCompleteAuthSession();

let emailVar = false;
let passwordVar = false;

const googleExpoClientId = config.EXPO_CLIENT_ID;
const googleAndroidClientId = config.ANDROID_CLIENT_ID;
const googleIOSClientId = config.IOS_CLIENT_ID;
const facebookAppId = config.FACEBOOK_APP_ID;

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/user.gender.read'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: googleExpoClientId, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: googleAndroidClientId, // [Android] specifies an account name on the device that should be used
  iosClientId: googleIOSClientId, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

// const UriRedirect = AuthSession.makeRedirectUri({
//   scheme: 'com.divego',
//   path: "redirect"
// })

export default function SignInRoute() {
  const { activeSession, setActiveSession } = useContext(SessionContext);

  const [loginFail, setLoginFail] = useState(null);

  const [formVals, setFormVals] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [formValidation, SetFormValidation] = useState({
    email: false,
    password: false,
    firstName: "",
    lastName: "",
  });

  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const [req, res, promptAsync] = Google.useAuthRequest({
    androidClientId: googleAndroidClientId,
    iosClientId: googleIOSClientId,
    // expoClientId: googleExpoClientId
  });

  const [req2, res2, promptAsync2] = Facebook.useAuthRequest({
    clientId: facebookAppId,
  });

  // const configAndroid = {
  //   issuer: 'https://accounts.google.com',
  //   clientId: googleAndroidClientId,
  //   redirectUrl: UriRedirect,
  //   scopes: ['openid', 'profile'],
  // };

  const handleOAuthSubmit = async (user) => {
    let Fname;
    let LName;

    alert(user.name + " " + user.id + " " + user.email)

    if (user.name) {
      Fname = user.name.split(" ").slice(0, 1);
      LName = user.name.split(" ").slice(-1);
    } else {
      if (user.family_name) {
        Fname = user.given_name;
        LName = user.family_name;
      } else {
        Fname = user.given_name.split(" ").slice(0, -1).join(" ");
        LName = user.given_name.split(" ").slice(-1)[0];
      }
    }

    let Pword = user.id;
    let MailE = user.email;

    let accessToken = await OAuthSignIn({
      password: Pword,
      email: MailE,
      firstName: Fname,
      lastName: LName,
    });
  };

  async function OAuthSignIn(formVals) {
    let accessToken = await signInStandard(formVals);
    if (accessToken) {
      await AsyncStorage.setItem("token", JSON.stringify(accessToken));
      setActiveSession(accessToken);
    } else {
      let registrationToken = await register(formVals);
      if (registrationToken.session !== null) {
      await AsyncStorage.setItem("token", JSON.stringify(registrationToken));
      setActiveSession(registrationToken);
      } else {
        setLoginFail("You already have an account with this email"); 
      }
    }
  }

  useEffect(() => {
    handleFacebookSignIn();
  }, [res2]);

  useEffect(() => {
    handleGoogleSignIn();
  }, [res]);


  async function handleGoogleSignIn() {
    if (res && res?.type === "success") {
      await getGoogleUserData(res.authentication.accessToken);
    }
  }

  async function getGoogleUserData(token) {
    if (!token) return;
    try {
      const res = await fetch(`https://www.googleapis.com/userinfo/v2/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      handleOAuthSubmit(user);
    } catch (err) {
      console.log("error", err);
    }
  }

  const handleGAsync = async () => {
    if (Platform.OS === "android"){
      // await authorize(configAndroid)
      await promptAsync( { showInRecents: true, useProxy: false } );
    } else {
      await promptAsync( { showInRecents: true, useProxy: false } );
    }
  };

  const handlePAsync = async () => {
    const res1 = await promptAsync2();
  };

  async function getFacebokUserData(token2) {
    if (!token2) return;

    try {
      const res2 = await fetch(
        `https://graph.facebook.com/me?access_token=${token2}&fields=id,name,email`
      );
      const user2 = await res2.json();
      handleOAuthSubmit(user2);

    } catch (err) {
      console.log("error", err);
    }
  }

  async function handleFacebookSignIn() {
    if (res2 && res2?.type === "success" && res2.authentication) {
      await getFacebokUserData(res2.authentication.accessToken);
    }
  }

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
      setLoginFail("Please fill out both email and password");
      return;
    } else {
      let accessToken = await signInStandard(formVals);
      if (accessToken) {
        await AsyncStorage.setItem("token", JSON.stringify(accessToken));
        setActiveSession(accessToken);
      } else {
        setLoginFail("The credentials you supplied are not valid");
        return;
      }
      let checker = await sessionCheck();
      //  console.log("checkerbox", checker)
    }
  };

  const keboardOffset = Platform.OS === "ios" ? 100 : 0;


  return (
    <View style={styles.container}>
       <Image source={Headliner} style={[styles.Headliner]} />

       <View style={{ marginTop: "5%" }}>
        <TouchableWithoutFeedback
          onPress={handleGAsync}
          // disabled={!req}
        >
          
          <View style={[styles.SignUpWithButtons]}>
            <Image source={googleLogo} style={[styles.gLogo]} />
            <Text
              style={{
                color: "#FFFFFF",
                fontFamily: "PermanentMarker_400Regular",
                fontSize: 12,
                opacity: 0.7,
              }}
            >
              Sign In With Google
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={handlePAsync}>
          <View style={[styles.SignUpWithButtons]}>
            <Image source={facebookLogo} style={[styles.fbLogo]} />
            <Text
              style={{
                marginLeft: scale(5),
                color: "#FFFFFF",
                fontFamily: "PermanentMarker_400Regular",
                fontSize: 12,
                opacity: 0.7,
              }}
            >
              Sign In With Facebook
            </Text>
          </View>
        </TouchableWithoutFeedback>

        {/* <Text>{JSON.stringify(userInfo)}</Text> */}
      </View>
      
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keboardOffset}
      >
      <View style={styles.inputContainer}>
        <InsetShadow
          containerStyle={{
            borderRadius: 25,
            height: 40,
            width: 200,
            marginRight: 7,
            marginTop: 10,
          }}
          elevation={20}
          shadowRadius={15}
          shadowOpacity={0.3}
        >
          <TextInput
            style={formValidation.emailVal ? styles.inputRed : styles.input}
            value={formVals.email}
            placeholder={"Email"}
            placeholderTextColor="darkgrey"
            color="#F0EEEB"
            fontSize={18}
            onChangeText={(emailsText) =>
              setFormVals({ ...formVals, email: emailsText })
            }
            onFocus={() => setLoginFail(null)}
          ></TextInput>
        </InsetShadow>

        <InsetShadow
          containerStyle={{
            borderRadius: 25,
            height: 40,
            width: 200,
            marginRight: 7,
            marginTop: 10,
          }}
          elevation={20}
          shadowRadius={15}
          shadowOpacity={0.3}
        >
          <TextInput
            style={formValidation.passwordVal ? styles.inputRed : styles.input}
            value={formVals.password}
            placeholder={"Password"}
            fontSize={18}
            secureTextEntry={true}
            placeholderTextColor="darkgrey"
            color="#F0EEEB"
            onChangeText={(passwordsText) =>
              setFormVals({ ...formVals, password: passwordsText })
            }
            onFocus={() => setLoginFail(null)}
          ></TextInput>
        </InsetShadow>
        {loginFail && <Text style={styles.erroMsg}>{loginFail}</Text>}
      </View>
      </KeyboardAvoidingView>

      <View style={styles.SubmitButton2}>
        <TouchableWithoutFeedback onPress={handleSignInSubmit}>
          <Text
            style={{
              color: "gold",
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

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#538dbd",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(10),
  },
  input: {
    fontFamily: "IndieFlower_400Regular",
    backgroundColor: "#538dbd",
    borderRadius: 10,
    width: scale(200),
    height: 40,
    alignSelf: "center",
    marginBottom: 20,
    textAlign: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,

    elevation: 10,
  },
  inputRed: {
    fontFamily: "IndieFlower_400Regular",
    backgroundColor: "pink",
    borderRadius: 10,
    width: scale(200),
    height: 40,
    alignSelf: "center",
    marginBottom: 20,
    textAlign: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,

    elevation: 10,
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
    bottom: "3%",
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
    bottom: "3%",
    marginLeft: 70,
    borderWidth: 0.3,
    zIndex: 2,
    width: "85%",
    borderTopColor: "darkgrey",
    borderColor: "transparent",
    borderBottomColor: "transparent",
  },
  singups: {
    marginTop: "25%",
    marginBottom: "-23%",
  },
  SignUpWithButtons: {
    backgroundColor: "#538dbd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 35,
    width: 200,
    marginTop: scale(5),
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  fbLogo: {
    height: 25,
    width: 25,
    opacity: 0.5,
    marginRight: 0,
  },
  gLogo: {
    height: 18,
    width: 18,
    opacity: 0.5,
    marginRight: 18,
  },
  erroMsg: {
    margin: 5,
    padding: 7,
    color: "pink",
    fontFamily: "IndieFlower_400Regular",
    borderStyle: "dashed",
    borderRadius: 10,
    borderColor: "darkblue",
    borderWidth: 1,
    marginTop: scale(10)
  },
  Headliner:{
    height: scale(250),
    width: '100%',
    marginLeft: "-3%",
    marginTop: "-5%",
  }
});
