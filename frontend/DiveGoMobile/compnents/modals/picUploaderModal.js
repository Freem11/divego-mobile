import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { PinContext } from "../contexts/staticPinContext";
import { PictureAdderContext } from "../contexts/picModalContext";
import { MasterContext } from "../contexts/masterContext";
import { PictureContext } from "../contexts/pictureContext";
import { getToday } from "../helpers/picUploaderHelpers";
import { formatDate, createFile } from "../helpers/imageUploadHelpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import AnimalAutoSuggest from "../AutoSuggest";
import { uploadphoto } from "../../supabaseCalls/uploadSupabaseCalls";
import { removePhoto } from "../../supabaseCalls/uploadSupabaseCalls";
// import { removePhoto } from "../../axiosCalls/uploadAxiosCalls";
import { insertPhotoWaits } from "../../supabaseCalls/photoWaitSupabaseCalls";
// import { insertPhotoWaits } from "../../axiosCalls/photoWaitAxiosCalls";
import { scale } from "react-native-size-matters";
import { userCheck } from "../../supabaseCalls/authenticateSupabaseCalls";

const { width, height } = Dimensions.get("window");

let IPSetter = 2;
let IP;
//Desktop = 10.0.0.253
//Laptop = 10.0.0.68
//Library = 10.44.22.110

if (IPSetter === 1) {
  IP = "10.0.0.253";
} else if (IPSetter === 2) {
  IP = "10.0.0.68";
} else if (IPSetter === 3) {
  IP = "10.44.22.110";
}

let PicVar = false;
let DateVar = false;
let AnimalVar = false;
let LatVar = false;
let LngVar = false;


export default function PicUploadModal() {
  const { setMasterSwitch } = useContext(MasterContext);

  const { pinValues, setPinValues } = useContext(PinContext);
  const { picAdderModal, setPicAdderModal } = useContext(PictureAdderContext);

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [date, setDate] = useState(new Date());

  const { uploadedFile, setUploadedFile } = useContext(PictureContext);

  const [formValidation, SetFormValidation] = useState({
    PictureVal: false,
    DateVal: false,
    AnimalVal: false,
    LatVal: false,
    LngVal: false,
  });

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

  let UserId;
  
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

    const getUser = async () => {
      UserId = await userCheck();
      setPinValues({ ...pinValues, UserId: UserId.id });
    };
  
    // getUser();

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
    colorDate = "#F0EEEB";
  }

  const handleSubmit = () => {
   
    if (pinValues.PicFile === "" || pinValues.PicFile === null) {
      PicVar = true;
    } else {
      PicVar = false;
    }

    if (pinValues.PicDate === "" || pinValues.PicDate === null) {
      DateVar = true;
    } else {
      DateVar = false;
    }

    if (pinValues.Animal === "" || pinValues.Animal === null) {
      AnimalVar = true;
    } else {
      AnimalVar = false;
    }

    if (pinValues.Latitude === "" || pinValues.Latitude === null) {
      LatVar = true;
    } else {
      LatVar = false;
    }

    if (pinValues.Longitude === "" || pinValues.Longitude === null) {
      LngVar = true;
    } else {
      LngVar = false;
    }

    SetFormValidation({
      ...formValidation,
      PictureVal: PicVar,
      DateVal: DateVar,
      AnimalVal: AnimalVar,
      LatVal: LatVar,
      LngVal: LngVar,
    });

    if (
      pinValues.PicFile === "" ||
      pinValues.PicFile === null ||
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
  
  const handleImageUpload = async () => {
    try {
      const image = await chooseImageHandler();
      if (image) {
        let formattedDate;
        let newLatitude;
        let newLongitude;
        if (image.exif.DateTimeOriginal) {
          formattedDate = formatDate(image.exif.DateTimeOriginal);
          DateVar = false
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
            fileName: uploadedFile,
          });
        }

        AnimalVar = false
        LngVar = false
        LatVar = false

        let fileToUpload = createFile(image.uri);
        const data = new FormData();
        data.append("image", fileToUpload);

        const newFilePath = await uploadphoto(data, image.uri);
        setUploadedFile(newFilePath);

        setPinValues({
          ...pinValues,
          PicFile: newFilePath,
          PicDate: formattedDate,
          Latitude: newLatitude,
          Longitude: newLongitude,
        });

        SetFormValidation({
          ...formValidation,
          PictureVal: PicVar,
          DateVal: DateVar,
          AnimalVal: AnimalVar,
          LatVal: LatVar,
          LngVal: LngVar,
        });


        // fetch(`http://${IP}:5000/api/upload`, {
        //   method: "POST",
        //   body: data,
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log("data is", data)
        //     setPinValues({
        //       ...pinValues,
        //       PicFile: data.fileName,
        //       PicDate: formattedDate,
        //       Latitude: newLatitude,
        //       Longitude: newLongitude,
        //     });
        //     console.log("stored:", data.fileName);
        //   })
        //   .catch((err) => {
        //     return err;
        //   });

        // setUploadedFile(image.uri);
      }
    } catch (e) {
      console.log("error: Photo Selection Cancelled", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.picContainer}>
        <Image
          source={{
            uri: `https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${uploadedFile}`,
          }}
          style={formValidation.PictureVal ? styles.imgStyleRed : styles.imgStyle}
        />
      </View>

      <TouchableWithoutFeedback onPress={handleImageUpload}>
        <View style={[styles.ImageButton]}>
          <FontAwesome name="picture-o" color="#9B884E" size={28} />
          <Text
            style={{
              marginLeft: scale(5),
              color: "#9B884E",
              fontFamily: "PermanentMarker_400Regular",
              fontSize: scale(12),
            }}
          >
            Choose an Image
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.calZone}>
        <TextInput
          style={formValidation.DateVal ? styles.inputCalRed : styles.inputCal}
          value={pinValues.PicDate}
          placeholder={"Date"}
          editable={false}
          color={colorDate}
          fontSize={21}
          placeholderTextColor={colorDate}
          onChangeText={(text) => setPinValues({ ...pinValues, Animal: text })}
        ></TextInput>
        <TouchableWithoutFeedback onPress={showDatePicker}>
          <View style={styles.dateIcon}>
            <FontAwesome name="calendar" color="#9B884E" size={28} />
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
        <AnimalAutoSuggest pin={pinValues} setPin={setPinValues} formValidation={formValidation} SetFormValidation={SetFormValidation}/>
      </KeyboardAvoidingView>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          marginBottom: "5%",
        }}
      >
        <View>
          <TextInput
            style={formValidation.LatVal ? styles.inputRed : styles.input}
            value={pinValues.Latitude}
            placeholder={"Latitude"}
            editable={false}
            placeholderTextColor="grey"
            fontSize={18}
            color="#F0EEEB"
            onChangeText={(text) =>
              setPinValues({ ...pinValues, Latitude: text })
            }
          ></TextInput>

          <TextInput
            style={formValidation.LngVal ? styles.inputRed : styles.input}
            value={pinValues.Longitude}
            placeholder={"Longitude"}
            editable={false}
            placeholderTextColor="grey"
            fontSize={18}
            color="#F0EEEB"
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
                color="#9B884E"
                size={38}
                style={{ zIndex: -1 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View style={styles.SubmitButton}>
        <TouchableWithoutFeedback onPress={handleSubmit}>
          <Text
            style={{
              color: "#9B884E",
              fontSize: 17,
              marginTop: 8,
              fontFamily: "PermanentMarker_400Regular",
              borderColor: "transparent",
              width: "100%",
              alignSelf: "center",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
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
    backgroundColor: "#355D71",
    alignItems: "center",
    marginTop: scale(55),
    marginBottom: 15,
    width: "100%",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  input: {
    fontFamily: "IndieFlower_400Regular",
    backgroundColor: "#33586A",
    borderRadius: 10,
    width: 200,
    height: 40,
    alignSelf: "center",
    marginBottom: 15,
    marginLeft: -5,
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
    marginBottom: 15,
    marginLeft: -5,
    textAlign: "center",
    overflow: "hidden",
  },
  inputCal: {
    fontFamily: "IndieFlower_400Regular",
    backgroundColor: "#33586A",
    borderRadius: 10,
    width: 200,
    height: 40,
    alignSelf: "center",
    marginBottom: 15,
    textAlign: "center",
    marginRight: 20,
  },
  inputCalRed: {
    fontFamily: "IndieFlower_400Regular",
    backgroundColor: "pink",
    borderRadius: 10,
    width: 200,
    height: 40,
    alignSelf: "center",
    marginBottom: 15,
    textAlign: "center",
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
    backgroundColor: "#33586A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(15),
    height: scale(35),
    width: scale(160),
    marginLeft: 0,
    marginTop: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  picContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.3,
    borderRadius: scale(15),
    borderColor: "darkgrey",
    width: scale(220),
    height: scale(110),
    marginTop: -90,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 20,
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
    justifyContent: "center",
    zIndex: -1,
    backgroundColor: "#33586A",
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 10,
    width: 38,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  calZone: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: -5,
    marginBottom: -5,
  },
  autocomplete: {
    width: 275,
    height: 30,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: 15,
    zIndex: 20,
  },
  SubmitButton: {
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: "85%",
    borderTopColor: "darkgrey",
    borderColor: "transparent",
    borderBottomColor: "transparent",
    bottom: "1%",
  },
  dateIcon: {
    backgroundColor: "#33586A",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    height: 35,
    width: 38,
    marginTop: -15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  imgStyle: {
    width: "101%",
    height: "101%",
    borderRadius: 15,
    backgroundColor: "#355D71",
  },
  imgStyleRed: {
    width: "101%",
    height: "101%",
    borderRadius: 15,
    backgroundColor: "pink",
  },
});
