import React, { useState, useEffect, useContext } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { photos } from "./data/testdata";
import { getAnimalNames } from "../axiosCalls/photoAxiosCalls";
import { AnimalSelectContext } from "./contexts/animalSelectContext";
import addIndexNumber from "./helpers/optionHelpers";

export default function AnimalAutoComplete() {
  const { setAnimalSelection } = useContext(AnimalSelectContext);
  const [list, setList] = useState([]);

  const handleAnimalList = async () => {
    let animalData = await getAnimalNames();
    setList(addIndexNumber(animalData));
  }

  useEffect(() => {
    handleAnimalList()
  }, []);

  const handleConfirm = (animal) => {
    if (animal !== null) {
      setAnimalSelection(animal.title);
    }
  };

  const handleClear = () => {
    setAnimalSelection("");
    handleAnimalList()
  };

  const handleChangeText = () => {
    handleAnimalList()
    console.log(list)
  };

  return (
    <View style={styles.container}>
      <AutocompleteDropdown
        initialValue="Species"
        textInputProps={{
          style: {
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            width: 200,
            opacity: 1,
            height: 40,
            marginBottom: 5
          },
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
        onChangeText={() => handleChangeText}
        onFocus={() => handleChangeText}
        onBlur={() => handleChangeText}
        showChevron={false}
        showClear={true}
        closeOnBlur={true}
        onClear={(text) => handleClear(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: 200,
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: 1,
    transform: [{ scaleX: -1 }],
  },
});
