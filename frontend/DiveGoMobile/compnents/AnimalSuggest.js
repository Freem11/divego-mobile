import React from "react";
import { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from "react-native";
// import { getAnimalNamesThatFit } from "../axiosCalls/photoAxiosCalls";
import { getAnimalNamesThatFit } from "../supabaseCalls/photoSupabaseCalls";
import AnimalSuggestListItem from "./AnimalSuggestListItem";
import { MaterialIcons } from "@expo/vector-icons";
import { scale } from 'react-native-size-matters';
import { AnimalSelectContext } from "./contexts/animalSelectContext";

export default function AnimalTopAutoSuggest(props) {
  // const { setPin, pin, formValidation, SetFormValidation } = props;
  const { animalSelection, setAnimalSelection } = useContext(AnimalSelectContext);
  const [list, setList] = useState([]);

  const [animalText, setAnimalText] = useState({Name: ""});

  const handleChange = async (text) => {
    setAnimalText({ Name: text})
    
    if (text.length > 0) {
      let newfilteredList = await getAnimalNamesThatFit(text);
      let animalArray = []
      newfilteredList.forEach((animal) => {
        if (!animalArray.includes(animal.label)){
          animalArray.push(animal.label)
        }
        })
      setList(animalArray);
    } else {
      setList([]);
    }
  };

  const handleClear = () => {
    setAnimalSelection("");
    setAnimalText({Name: ""})
    setList([]);
    Keyboard.dismiss();
  };

  return (
    <View >
      <View style={styles.container} keyboardShouldPersistTaps={"always"}>
        <TextInput
          style={ styles.suggestInput}
          placeholder={"all the fish in the sea"}
          value={animalText.Name}
          placeholderTextColor="black"
          onChangeText={handleChange}
        ></TextInput>
        {animalText.Name.length > 1 && (
          <TouchableWithoutFeedback onPress={handleClear}>
            <View style={styles.xButton}>
              <MaterialIcons
                name="highlight-remove"
                size={18}
                color="grey"
              />
            </View>
          </TouchableWithoutFeedback>
        )}
         {animalText.Name.length < 2 && (
          <TouchableWithoutFeedback>
            <View style={styles.aButton}>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={18}
                color="grey"
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
      <View style={styles.listcont}>
      {list.length > 0 &&
        list.map((animal) => {
          return (
            <AnimalSuggestListItem
              key={animal}
              name={animal}
              animalSelection={animalSelection}
              setAnimalSelection={setAnimalSelection}
              animalText={animalText}
              setAnimalText={setAnimalText}
              setList={setList}
            />
          );
        })}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    overflow: "hidden",
    alignContent: 'center',
    alignItems: 'center',

  },
  xButton: {
    marginTop: 0,
    marginLeft: -24,
  },
  aButton: {
    marginTop: 0,
    marginLeft: -24,
    zIndex: -1
  },
  suggestInput: {
    width: '86%',
    height: 19,
    paddingLeft: 10,
    paddingRight: 25,
    // backgroundColor: "#f5eded",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 0,
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
    marginTop: "15%",
    position: "absolute"
  },
});
