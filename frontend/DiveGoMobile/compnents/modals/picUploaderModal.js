import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { PinContext } from "../contexts/staticPinContext";
import { PictureAdderContext } from "../contexts/picModalContext";
import { MasterContext } from "../contexts/masterContext";
import { PictureContext } from "../contexts/pictureContext";
import { getToday } from "../helpers/picUploaderHelpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import AnimalAutoSuggest from "../AutoSuggest";
import { removePhoto } from "../../axiosCalls/uploadAxiosCalls";
import { insertPhotoWaits } from "../../axiosCalls/photoWaitAxiosCalls";

export default function PicUploadModal() {
  const { setMasterSwitch } = useContext(MasterContext);

  const { pinValues, setPinValues } = useContext(PinContext);
  const { picAdderModal, setPicAdderModal } = useContext(PictureAdderContext);

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [date, setDate] = useState(new Date());

  const { uploadedFile, setUploadedFile } = useContext(PictureContext);

  const onNavigate = () => {
    setMasterSwitch(false);
    setPicAdderModal(!picAdderModal);
  };

  useEffect(() => {
    let formattedDate = moment(date).format("YYYY-MM-DD");
    setPinValues({ ...pinValues, PicDate: formattedDate });
  }, [date]);

  const chooseImageHandler = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("image library permissions denied");
        return;
      }
    }

    let chosenImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true,
    });

    try {
      return await chosenImage;
    } catch (e) {
      console.log({ title: "Image Upload", message: e.message });
    }
  };

  useEffect(() => {
    if (pinValues.PicDate === "") {
      let Rnow = new Date();

      let rightNow = getToday(Rnow);

      setPinValues({
        ...pinValues,
        PicDate: rightNow,
      });
    } else {
      setPinValues(pinValues);
    }
  }, []);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    let formattedDate = moment(date).format("YYYY-MM-DD");
    setPinValues({ ...pinValues, PicDate: formattedDate });
    hideDatePicker();
  };

  const AnimalKeboardOffset = Platform.OS === "ios" ? 350 : 0;

  let colorDate;
  if (pinValues.PicDate === "") {
    colorDate = "rgb(128,128,128)";
  } else {
    colorDate = "black";
  }

  const handleSubmit = () => {
    if (
      pinValues.PicFile === "" ||
      pinValues.PicDate === "" ||
      pinValues.Longitude === "" ||
      pinValues.Latitude === "" ||
      pinValues.Animal === ""
    ) {
      return;
    } else {
      insertPhotoWaits(pinValues);
      setPinValues({
        PicFile: null,
        Animal: "",
        PicDate: "",
        Latitude: "",
        Longitude: "",
        DDVal: "0",
      });
      setUploadedFile(null);
      setPicAdderModal(!picAdderModal);
    }
  };


  const handleImageUpload = async() => {
    try {
      const image = await chooseImageHandler();
      if (image) {
        let formattedDate;
        let newLatitude;
        let newLongitude;
        if (image.exif.DateTimeOriginal) {
          let slicedDate = image.exif.DateTimeOriginal.substring(
            0,
            10
          );
          formattedDate = slicedDate.replaceAll(":", "-");
        } else {
          formattedDate = pinValues.PicDate;
        }
        if (image.exif.GPSLatitude) {
          newLatitude = image.exif.GPSLatitude.toString();
          newLongitude = image.exif.GPSLongitude.toString();
        } else {
          newLatitude = pinValues.Latitude;
          newLongitude = pinValues.Longitude;
        }

        if (pinValues.PicFile !== null) {
          removePhoto({
            filePath: "./wetmap/src/components/uploads/",
            fileName: pinValues.PicFile,
          });
        }

        let fileName = image.uri.substring(
          image.uri.lastIndexOf("/") + 1,
          image.uri.length
        );

        const fileToUpload = {
          uri: image.uri,
          name: fileName,
          type: "image/jpg",
        };

        const data = new FormData();
        data.append("image", fileToUpload);

        fetch("http://10.0.0.68:5000/api/upload", {
          method: "POST",
          body: data,
        })
          .then((response) => response.json())
          .then((data) => {
            setPinValues({
              ...pinValues,
              PicFile: data.fileName,
              PicDate: formattedDate,
              Latitude: newLatitude,
              Longitude: newLongitude,
            });
            console.log("stored:", data.fileName);
          })
          .catch((err) => {
            return err;
          });

        setUploadedFile(image.uri);
      }
    } catch (e) {
      console.log("error: Photo Selection Cancelled", e.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.picContainer}>
        <Image
          source={{ uri: uploadedFile }}
          style={{ width: "100%", height: 130, borderRadius: 15 }}
        />
      </View>

      <TouchableWithoutFeedback
        onPress={handleImageUpload}
      >
        <View style={[styles.ImageButton]}>
          <FontAwesome name="picture-o" color="red" size={32} />
          <Text
            style={{
              marginLeft: 5,
              color: "maroon",
              fontFamily: "PermanentMarker_400Regular",
            }}
          >
            Choose an Image
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.calZone}>
        <TextInput
          style={styles.inputCal}
          value={pinValues.PicDate}
          placeholder={"Date"}
          editable={false}
          color={colorDate}
          placeholderTextColor={colorDate}
          onChangeText={(text) => setPinValues({ ...pinValues, Animal: text })}
        ></TextInput>
        <TouchableWithoutFeedback onPress={showDatePicker}>
          <View style={{ marginTop: 2.5, marginLeft: 2 }}>
            <FontAwesome name="calendar" color="red" size={32} />
            <DateTimePickerModal
              date={new Date(pinValues.PicDate)}
              isVisible={datePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={AnimalKeboardOffset}
        style={styles.autocomplete}
      >
        <AnimalAutoSuggest pin={pinValues} setPin={setPinValues} />
      </KeyboardAvoidingView>

      <View style={{ flexDirection: "row", width: "100%", zIndex: -1 }}>
        <View>
          <TextInput
            style={styles.input}
            value={pinValues.Latitude}
            placeholder={"Latitude"}
            editable={false}
            placeholderTextColor="grey"
            color="black"
            onChangeText={(text) =>
              setPinValues({ ...pinValues, Latitude: text })
            }
          ></TextInput>

          <TextInput
            style={styles.input}
            value={pinValues.Longitude}
            placeholder={"Longitude"}
            editable={false}
            placeholderTextColor="grey"
            color="black"
            onChangeText={(text) =>
              setPinValues({ ...pinValues, Longitude: text })
            }
          ></TextInput>
        </View>

        <View style={{ marginLeft: 7, marginTop: 15 }}>
          <TouchableWithoutFeedback onPress={onNavigate}>
            <View style={[styles.LocButton]}>
              <MaterialIcons
                name="location-pin"
                color="red"
                size={48}
                style={{ marginLeft: 5, zIndex: -1 }}
              />
              <Text
                style={{
                  marginLeft: 5,
                  color: "maroon",
                  fontFamily: "ShadowsIntoLight_400Regular",
                }}
              >
                Drop Pin
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View style={styles.SubmitButton}>
        <TouchableWithoutFeedback onPress={handleSubmit}>
          <Text
            style={{
              color: "blue",
              fontSize: 17,
              marginTop: 8,
              fontFamily: "PermanentMarker_400Regular",
            }}
          >
            Submit Photo
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8DBE2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  input: {
    fontFamily: "IndieFlower_400Regular",
    backgroundColor: "white",
    borderRadius: 25,
    width: 200,
    height: 40,
    alignSelf: "center",
    marginBottom: 20,
    marginLeft: 20,
    textAlign: "center",
    zIndex: -1,
    overflow: "hidden",
  },
  inputCal: {
    fontFamily: "IndieFlower_400Regular",
    backgroundColor: "white",
    borderRadius: 25,
    width: 200,
    height: 40,
    alignSelf: "center",
    marginBottom: 15,
    textAlign: "center",
    borderRadius: 25,
    marginRight: 20,
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
    width: 140,
    marginLeft: 0,
    marginTop: 15,
    marginBottom: 15,
  },
  picContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "darkgrey",
    width: "80%",
    height: 130,
    marginTop: -50,
  },
  modalStyle: {
    flex: 1,
    backgroundColor: "#D8DBE2",
    borderRadius: 20,
    margin: 70,
    marginTop: 300,
    marginBottom: 300,
    borderColor: "#D8DBE2",
    borderWidth: 8,
    opacity: 1,
  },
  closeButton: {
    borderRadius: 42 / 2,
    backgroundColor: "maroon",
    height: 34,
    width: 34,
    marginLeft: 170,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  LocButton: {
    alignItems: "center",
    zIndex: -1,
  },
  calZone: {
    width: "100%",
    flexDirection: "row",
    marginLeft: 40,
  },
  autocomplete: {
    width: "100%",
    height: 30,
    marginBottom: 30,
    marginLeft: 40,
  },
  SubmitButton: {
    position: "absolute",
    alignItems: "center",
    bottom: 10,
    backgroundColor: "palegreen",
    borderEndColor: "green",
    borderWidth: 0.3,
    width: 140,
    height: 40,
    borderRadius: 15,
    opacity: 0.5,
    zIndex: -1,
  },
});
