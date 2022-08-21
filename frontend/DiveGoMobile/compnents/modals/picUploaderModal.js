import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { PinContext } from "../contexts/staticPinContext";
import { getToday } from "../helpers/picUploaderHelpers";
import { FontAwesome } from "@expo/vector-icons";

export default function PicUploadModal() {

  const { pinValues, setPinValues } = useContext(PinContext);

  const UploadFromURI = async(photo) => {
    if (!photo.cancelled){
      const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);
      const fileName = photo.uri.replace(/^.*[\\\/]/, "");

      let formData = new FormData();
      formData.append("files", {
        uri: photo.uri,
        name: fileName,
        type: photo.type ? `image/${ext}` : `video/${ext}`,
      });

      return { ...photo, imageData: formData }

      } else {
        return photo
      }
    }
  

  const chooseImageHandler = async () => {
  
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(status !== "granted") {
        console.log("image library permissions denied");
        return;
      }
    }

    let chosenImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    })

    try {
      return await(chosenImage)
  
    } catch (e) {console.log({ title: "Image Upload", message: e.message })}
    
  };

  
  const [formVals, setFormVals] = useState({
    siteName: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {

    if (pinValues.PicDate === "") {
      let Rnow = new Date();

      let rightNow = getToday(Rnow);

      setPinValues({
        ...pinValues,
        PicDate: rightNow,
      });
    }
  }, []);
console.log("pin is", pinValues)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please Submit Your Picture</Text>

      <View style={styles.picContainer}>
        <Image source={{ uri: pinValues.PicFile }} style={{ width: "100%", height: 130 }} />
      </View>

      <TouchableWithoutFeedback onPress={async () => {
        const response = await chooseImageHandler()
      if (response){
        console.log("this", response.uri)
        setPinValues({...pinValues, PicFile: response.uri})
        
      } else {
        console.log("???",response)
      }}}>
        <View style={[styles.ImageButton]}>
          <FontAwesome name="picture-o" color="red" size={32} />
          <Text style={{ marginLeft: 5 }}>Choose an Image</Text>
        </View>
      </TouchableWithoutFeedback>

      <TextInput
        style={styles.input}
        value={pinValues.PicDate}
        onChangeText={(text) => setPinValues({ ...pinValues, PicDate: text })}
      ></TextInput>

      <TextInput
        style={styles.input}
        value={pinValues.animal}
        placeholder={"Animal"}
        onChangeText={(text) => setPinValues({ ...pinValues, animal: text })}
      ></TextInput>

      <TextInput
        style={styles.input}
        value={pinValues.latitude}
        placeholder={"Latitude"}
        onChangeText={(text) => setPinValues({ ...pinValues, latitude: text })}
      ></TextInput>

      <TextInput
        style={styles.input}
        value={pinValues.longitude}
        placeholder={"Longitude"}
        onChangeText={(text) => setPinValues({ ...pinValues, longitude: text })}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8DBE2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 140,
    marginBottom: 15,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 15,
    width: 200,
    height: 30,
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
  ImageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    height: 45,
    width: 120,
    marginLeft: 0,
    marginTop: 10,
    marginBottom: 5,
  },
  picContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    height: 130,
  },
});
