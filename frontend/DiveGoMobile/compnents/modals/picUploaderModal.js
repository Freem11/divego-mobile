import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Platform,
  Modal,
} from "react-native";
import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import * as ImagePicker from "expo-image-picker";
import { PinContext } from "../contexts/staticPinContext";
import { PictureAdderContext } from "../contexts/picModalContext";
import { MasterContext } from "../contexts/masterContext";
import { getToday } from "../helpers/picUploaderHelpers";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export default function PicUploadModal() {

  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);

  const { pinValues, setPinValues } = useContext(PinContext);
  const { picAdderModal, setPicAdderModal } = useContext(PictureAdderContext);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  const navigation = useNavigation();

  const onNavigate = () => {
    setMasterSwitch(false);
    setPicAdderModal(!picAdderModal);
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  useEffect(() => {
    let formattedDate = moment(date).format('YYYY-MM-DD')
    setPinValues({...pinValues, PicDate: formattedDate})
  }, [date])

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
    });

    try {
      return await chosenImage;
    } catch (e) {
      console.log({ title: "Image Upload", message: e.message });
    }
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please Submit Your Picture</Text>

      <View style={styles.picContainer}>
        <Image
          source={{ uri: pinValues.PicFile }}
          style={{ width: "100%", height: 130, borderRadius: 15 }}
        />
      </View>

      <TouchableWithoutFeedback
        onPress={async () => {
          const response = await chooseImageHandler();
          if (response) {
            setPinValues({ ...pinValues, PicFile: response.uri });
          } else {
            console.log("???", response);
          }
        }}
      >
        <View style={[styles.ImageButton]}>
          <FontAwesome name="picture-o" color="red" size={32} />
          <Text style={{ marginLeft: 5 }}>Choose an Image</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => setShowDatePicker(!showDatePicker)}
      >
        <View style={styles.input}>
        <Text
          style={{alignSelf: "center", marginTop: 5}}
          value={date}
        >
          {pinValues.PicDate}
        </Text>
        </View>
      </TouchableWithoutFeedback>

      <TextInput
        style={styles.input}
        value={pinValues.animal}
        placeholder={"Animal"}
        onChangeText={(text) => setPinValues({ ...pinValues, animal: text })}
      ></TextInput>

<View style={{flexDirection: 'row', width: "100%"}}>

<View style={{marginLeft: "6%"}}>
  <TextInput
    style={styles.input}
    value={pinValues.latitude}
    placeholder={"Latitude"}
    onChangeText={(text) =>
      setPinValues({ ...pinValues, latitude: text })
    }
  ></TextInput>

  <TextInput
    style={styles.input}
    value={pinValues.longitude}
    placeholder={"Longitude"}
    onChangeText={(text) =>
      setPinValues({ ...pinValues, longitude: text })
    }
  ></TextInput>
</View>

<View style={{marginLeft: 5, marginTop: 7}}>
  <TouchableWithoutFeedback onPress={onNavigate}>
    <View style={[styles.LocButton]}>
      <MaterialIcons name="location-pin" color="red" size={48} />
      <Text style={{ marginLeft: 5, color: "maroon"}}>Drop Pin</Text>
    </View>
  </TouchableWithoutFeedback>
</View>
</View>

      {showDatePicker && (
        <Modal>
          <View style={styles.modalStyle}>
          <TouchableWithoutFeedback onPress={() => setShowDatePicker(!showDatePicker)}>
          <View style={styles.closeButton}>
            <FontAwesome
                name="check"
                color="white"
                size={24}
              />
            </View>
          </TouchableWithoutFeedback>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              display={"default"}
              onChange={onChange}
              style={{
                width: '65%',
                height: '60%',
                position:'absolute',
                fontSize: 30,
                top: 10

              }}
            />
          </View>
        </Modal>
      )}
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
    borderRadius: 15,
    borderColor: "darkgrey",
    width: "80%",
    height: 130,
  },
  modalStyle: {
    flex: 1,
    backgroundColor:'#D8DBE2',
    borderRadius: 20,
    margin: 70,
    marginTop: 300,
    marginBottom: 300,
    borderColor: "#D8DBE2",
    borderWidth: 8,
    opacity: 1
  },
  closeButton: {
    borderRadius: 42/2,
    backgroundColor: "maroon",
    height: 34,
    width: 34,
    marginLeft: 170,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center"
},
LocButton: {
  alignItems: "center"
}
});
