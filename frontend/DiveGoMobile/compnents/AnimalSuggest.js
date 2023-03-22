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
import AnimalSuggestListItem from "./AnimalSuggestListItem";
import { scale } from "react-native-size-matters";
import { getAnimalMultiSelect } from "../supabaseCalls/photoSupabaseCalls";
import { AnimalMultiSelectContext } from "./contexts/animalMultiSelectContext";
import AnimalTag from "./AnimalTags";
import Animated from "react-native-reanimated";

export default function AnimalTopAutoSuggest(props) {
  const { transTagsY } = props;
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

      
      <View style={styles.listcont} pointerEvents={'box-none'}>
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

        <Animated.View
        style={[transTagsY]} pointerEvents={'box-none'}>
          <View style={styles.tagContainer} pointerEvents={'box-none'}>
            {animalMultiSelection.length > 0 &&
              animalMultiSelection.map((animal) => {
                return (
                  <AnimalTag
                    key={animal}
                    animalMultiSelection={animalMultiSelection}
                    setAnimalMultiSelection={setAnimalMultiSelection}
                    animalName={animal}
                  />
                );
              })}
          </View>
        </Animated.View>
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
    width: "84%",
    height: scale(19),
    paddingLeft: 10,
    paddingRight: 25,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 2,
    fontSize: scale(16),
    textAlign: "center",
    fontFamily: "Caveat_700Bold",
    overflow: "hidden",
    // backgroundColor: "blue"
  },
  suggestInputRed: {
    width: 200,
    height: 40,
    marginBottom: 20,
    backgroundColor: "pink",
    borderRadius: 10,
    fontSize: 15,
    textAlign: "center",
    fontFamily: "IndieFlower_400Regular",
    overflow: "hidden",
  },
  listcont: {
    display: "flex",
    marginTop: scale(30),
    position: "absolute",
    // backgroundColor: "pink",
  },
  ImageButton: {
    backgroundColor: "#33586A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: scale(35),
    width: 165,
    marginBottom: 7,
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
    position: "relative",
    marginTop: scale(0),
    marginLeft: scale(-100),
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
    width: scale(340),
    // backgroundColor: "pink"
  },
});
