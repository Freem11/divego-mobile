import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text, } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { photos } from "./data/testdata";
import { PinContext } from "./contexts/staticPinContext";
import filterCreatures from "./helpers/optionHelpers"
import Animated, {
    useSharedValue,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    withSpring,
    withTiming,
  } from "react-native-reanimated";

export default function AnimalAutoComplete() {

const [searchVal, setSearchVal] = useState('')
const list = filterCreatures(photos);
const { pinValues, setPinValues } = useContext(PinContext);

const handleConfirm = (animal) => {
  if (animal !== null){
  if (animal !== "Animal"){
    setPinValues({ ...pinValues, Animal: animal.title});
  }
}
};

const handleClear = (animal) => {
  setPinValues({ ...pinValues, Animal: ""});
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
            }
        }}
        inputContainerStyle={{
          height: 40,
          borderRadius: 30,
          backgroundColor: "white",
          width: 200,
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