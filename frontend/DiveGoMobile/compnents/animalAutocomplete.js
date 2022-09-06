import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text, } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { photos } from "./data/testdata";
import { AnimalSelectContext } from "./contexts/animalSelectContext";
import filterCreatures from "./helpers/optionHelpers"
export default function AnimalAutoComplete() {

const list = filterCreatures(photos);
const { animalSelection, setAnimalSelection } = useContext(AnimalSelectContext);

const handleConfirm = (animal) => {
  if (animal !== null){
    setAnimalSelection(animal.title);

}
};

const handleClear = (animal) => {
  setAnimalSelection("");
}

if (!list) {
  setList(photos)
}

return(
    <View style={styles.container}>
        <AutocompleteDropdown
        initialValue='Species'
        textInputProps={{
            style: {
                backgroundColor: "white",
                borderRadius: 25,
                width: 200,
                opacity: 0.1,
                height: 40
            }
        }}
        inputContainerStyle={{
          height: 40,
          borderRadius: 30,
          backgroundColor: "white",
          width: 200,
          zIndex: 2,
        }}
        direction={"down"}
        dataSet={list}
        onSelectItem={(text) => handleConfirm(text)}
        showChevron={false}
        showClear={true}
        closeOnBlur={true}
        onClear={(text) => handleClear(text)}
        />
    </View>
   
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: 200,
      backgroundColor: "white",
      borderRadius: 10,
      zIndex: 1,
      transform: [{ scaleX: -1}]
    },
   
  });