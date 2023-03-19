import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from "react-native";
// import { getAnimalNamesThatFit } from "../axiosCalls/photoAxiosCalls";
import { getAnimalNamesThatFit } from "../supabaseCalls/photoSupabaseCalls";
import AnimalSuggestListItem from "./AnimalSuggestListItem";
import { scale } from "react-native-size-matters";
import { AnimalSelectContext } from "./contexts/animalSelectContext";
import { getAnimalMultiSelect } from "../supabaseCalls/photoSupabaseCalls";
import { AnimalMultiSelectContext } from "./contexts/animalMultiSelectContext";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

export default function AnimalTopAutoSuggest(props) {
  // const { setPin, pin, formValidation, SetFormValidation } = props;
  // const { animalSelection, setAnimalSelection } = useContext(
  //   AnimalSelectContext
  // );
  const { animalMultiSelection, setAnimalMultiSelection } = useContext(
    AnimalMultiSelectContext
  );
  const [list, setList] = useState([]);
  const [placehodler, setPlacehodler] = useState("Select Sea Creatures");

  const [animalText, setAnimalText] = useState("");

  useEffect(() => {
    if (animalMultiSelection.length > 0) {
      setPlacehodler(
        "Selected (" + animalMultiSelection.length.toString() + ") Creatures"
      );
    } else {
      setPlacehodler("Select Sea Creatures");
    }
  }, [animalMultiSelection]);

  const handleChange = async (text) => {
    setAnimalText(text);

    if (text.length > 0) {
      let newfilteredList = await getAnimalMultiSelect(text);
      let animalArray = [];
      newfilteredList.forEach((animal) => {
        if (!animalArray.includes(animal.label)) {
          animalArray.push(animal.label);
        }
      });
      setList(animalArray);
    } else {
      setList([]);
    }
  };

  const handleClearTag = async (text) => {
    if (animalMultiSelection.includes(text)) {
      setAnimalMultiSelection(
        animalMultiSelection.filter((item) => item !== text)
      );
    }
  };

  const handleClear = () => {
    if (animalMultiSelection.length > 0) {
      setPlacehodler(
        "Selected (" + animalMultiSelection.length.toString() + ") Creatures"
      );
    } else {
      setPlacehodler("Select Sea Creatures");
    }
    setList([]);
    setAnimalText("");
    Keyboard.dismiss();
  };

  return (
    <View>
      <View style={styles.container} keyboardShouldPersistTaps={"always"}>
        <TextInput
          style={styles.suggestInput}
          placeholder={placehodler}
          value={animalText}
          placeholderTextColor="grey"
          onChangeText={handleChange}
        ></TextInput>
      </View>
      <View style={styles.listcont}>
        {list.length > 0 &&
          list.map((animal) => {
            return (
              <AnimalSuggestListItem
                key={animal}
                name={animal}
                animalSelection={animalMultiSelection}
                setAnimalSelection={setAnimalMultiSelection}
                animalText={animalText}
                setAnimalText={setAnimalText}
                setList={setList}
              />
            );
          })}
        {animalText.length > 0 && list.length === 0 && (
          <Text
            style={{
              width: 165,
              height: 25,
              marginTop: 1,
              paddingTop: 3,
              backgroundColor: "#FFFFFF",
              textAlign: "center",
              alignContent: "center",
              // listStyle: "none",
              opacity: 1,
              transform: [{ translateY: 0 }],
              fontFamily: "IndieFlower_400Regular",
              textAlign: "center",
              color: "maroon",
            }}
          >
            No Sea Creatures Found
          </Text>
        )}

        {animalText.length > 0 && (
          <TouchableWithoutFeedback onPress={handleClear}>
            <View style={[styles.ImageButton]}>
              <Text
                style={{
                  color: "#9B884E",
                  fontFamily: "PermanentMarker_400Regular",
                  fontSize: scale(12),
                  opacity: 1,
                }}
              >
                Close
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}

        <View style={[styles.tagContainer]}>
          {animalMultiSelection.length > 0 &&
            animalMultiSelection.map((animal) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => handleClearTag(animal)}
                  key={animal}
                >
                  <View style={[styles.animalTag]} key={animal}>
                    <Text
                      style={{
                        color: "lightgrey",
                        fontFamily: "PermanentMarker_400Regular",
                        fontSize: scale(12),
                      }}
                    >
                      {animal}
                    </Text>
                    {/* <TouchableWithoutFeedback onPress={handleClearTag(animal)}> */}
                    <View style={styles.xButton}>
                      <MaterialIcons
                        name="highlight-remove"
                        size={18}
                        color="lightgrey"
                      />
                    </View>
                    {/* </TouchableWithoutFeedback> */}
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    flexDirection: "row",
    overflow: "hidden",
    alignContent: "center",
    alignItems: "center",
  },
  xButton: {
    margin: 2,
  },
  aButton: {
    marginTop: 0,
    marginLeft: -24,
    zIndex: -1,
  },
  suggestInput: {
    width: "86%",
    height: scale(19),
    paddingLeft: 10,
    paddingRight: 25,
    // backgroundColor: "#f5eded",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 2,
    fontSize: scale(16),
    textAlign: "center",
    fontFamily: "Caveat_700Bold",
    overflow: "hidden",
  },
  suggestInputRed: {
    width: 200,
    height: 40,
    marginBottom: 20,
    backgroundColor: "pink",
    borderRadius: 10,
    // color: "#F0EEEB",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "IndieFlower_400Regular",
    overflow: "hidden",
  },
  listcont: {
    display: "flex",
    marginTop: "15%",
    position: "absolute",
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
    width: scale(230),
  },
  ImageButton: {
    backgroundColor: "#33586A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: scale(35),
    width: scale(155),
    marginLeft: 0,
    opacity: 1,
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  tagContainer: {
    // backgroundColor: "pink",
    display: "flex",
    flexDirection: "row",
    marginLeft: scale(-100),
    marginTop: scale(5),
    maxWidth: scale(230),
  },
  animalTag: {
    display: "flex",
    flexDirection: "row",
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 10,
    margin: 2,
    paddingLeft: 2,
    paddingRight: 2,
  },
});
