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
import AutocompleteInput from "react-native-autocomplete-input";

export default function AnimalTopAutoSuggest(props) {
  // const { setPin, pin, formValidation, SetFormValidation } = props;
  const { animalSelection, setAnimalSelection } = useContext(AnimalSelectContext);
  const [list, setList] = useState([]);

  const handleChange = async (text) => {
    setAnimalSelection(text);
    // SetFormValidation({...formValidation, AnimalVal: false})

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
    setList([]);
    Keyboard.dismiss();
  };

  return (
    <View >
      <View style={styles.container}>
        <TextInput
          style={ styles.suggestInput}
          placeholder={"All"}
          value={animalSelection}
          placeholderTextColor="black"
          // color="#F0EEEB"
          onChangeText={handleChange}
        ></TextInput>
        {animalSelection.length > 1 && (
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
    marginTop: 1,
    marginLeft: -26,
  },
  suggestInput: {
    width: '86%',
    height: 19,
    paddingLeft: 10,
    paddingRight: 20,
    backgroundColor: "#f5eded",
    borderRadius: 5,
    marginTop: 0,
    fontSize: scale(16),
    textAlign: "left",
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
