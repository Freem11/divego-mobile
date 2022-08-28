import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Platform,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import Exif from "react-native-exif";
import { PinContext } from "../contexts/staticPinContext";
import { PictureAdderContext } from "../contexts/picModalContext";
import { MasterContext } from "../contexts/masterContext";
import { getToday, getDate } from "../helpers/picUploaderHelpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import AnimalAutoCompleteModal from "../animalAutocompleteModal";

export default function PicUploadModal() {
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);

  const { pinValues, setPinValues } = useContext(PinContext);
  const { picAdderModal, setPicAdderModal } = useContext(PictureAdderContext);

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [date, setDate] = useState(new Date());

  const onNavigate = () => {
    setMasterSwitch(false);
    setPicAdderModal(!picAdderModal);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
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

  return (
    <View style={styles.container}>
      <View style={styles.picContainer}>
        <Image
          source={{ uri: pinValues.PicFile }}
          style={{ width: "100%", height: 130, borderRadius: 15 }}
        />
      </View>

      <TouchableWithoutFeedback
        onPress={async () => {
          try {
            const response = await chooseImageHandler();
            if (response) {
              if (response.exif.DateTimeOriginal) {
                let formattedDate = response.exif.DateTimeOriginal.substring(
                  0,
                  10
                );
                let trueDate = formattedDate.replaceAll(":", "-");
                setPinValues({
                  ...pinValues,
                  PicFile: response.uri,
                  PicDate: trueDate,
                  Latitude: response.exif.GPSLatitude.toString(),
                  Longitude: response.exif.GPSLongitude.toString(),
                });
              } else {
                setPinValues({
                  ...pinValues,
                  PicFile: response.uri,
                });
              }
            } else {
              console.log("???", response);
            }
          } catch {
            console.log("error: Photo Selection Cancelled");
          }
        }}
      >
        <View style={[styles.ImageButton]}>
          <FontAwesome name="picture-o" color="red" size={32} />
          <Text style={{ marginLeft: 5, color: "maroon" }}>Choose an Image</Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.calZone}>
        <TextInput
          style={styles.inputCal}
          value={pinValues.PicDate}
          placeholder={"Date"}
          editable={false}
          placeholderTextColor="grey"
          onChangeText={(text) => setPinValues({ ...pinValues, Animal: text })}
        ></TextInput>
        <TouchableWithoutFeedback onPress={showDatePicker}>
          <View style={{marginTop: 2.5, marginLeft: 3}}>
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
        <AnimalAutoCompleteModal/>
      </KeyboardAvoidingView>


      <View style={{ flexDirection: "row", width: "100%" }}>
        <View style={{ marginLeft: "6%" }}>
          <TextInput
            style={styles.input}
            value={pinValues.Latitude}
            placeholder={"Latitude"}
            editable={false}
            placeholderTextColor="grey"
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
            onChangeText={(text) =>
              setPinValues({ ...pinValues, Longitude: text })
            }
          ></TextInput>
        </View>

        <View style={{ marginLeft: 7, marginTop: 15 }}>
          <TouchableWithoutFeedback onPress={onNavigate}>
            <View style={[styles.LocButton]}>
              <MaterialIcons name="location-pin" color="red" size={48} />
              <Text style={{ marginLeft: 5, color: "maroon" }}>Drop Pin</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
  inputBig: {
    backgroundColor: "white",
    borderRadius: 15,
    width: 240,
    height: 30,
    alignSelf: "center",
    marginBottom: 20,
    textAlign: "center",
    marginLeft: -20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 25,
    width: 200,
    height: 40,
    alignSelf: "center",
    marginBottom: 20,
    textAlign: "center",
  },
  inputCal: {
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
    width: 120,
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
  },
  calZone: {
    flexDirection: "row",
    marginLeft: -6,
  },
  autocomplete: {
    height: 30,
    marginBottom: 30,
    marginLeft: -60,
    
  }
});
