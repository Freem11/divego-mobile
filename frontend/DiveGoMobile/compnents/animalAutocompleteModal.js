import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text, } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { PinContext } from "./contexts/staticPinContext";
import { photos } from "./data/testdata";
import filterCreatures from "./helpers/optionHelpers"
import Animated, {
    useSharedValue,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    withSpring,
    withTiming,
  } from "react-native-reanimated";

export default function AnimalAutoCompleteModal() {

const { pinValues, setPinValues } = useContext(PinContext);

let list = filterCreatures(photos, pinValues.Animal);

useEffect(() => {
  if(pinValues.Animal === "" || pinValues.Animal === undefined){
    setPinValues({ ...pinValues, Animal: "Animal" , DDVal: '0'})
  }
  list = filterCreatures(photos, pinValues.Animal);
}, [])

const handleConfirm = (animal) => {
  if (animal !== null){
  if (typeof(animal) === "object"){
    setPinValues({ ...pinValues, Animal: animal.title.toString(), DDVal: animal.id.toString()});
  } else {
    setPinValues({ ...pinValues, Animal: animal, DDVal: '0' });
  }
}
};

let colorVal 
let padVal

if (pinValues.Animal === "Animal"){
  colorVal = "rgb(128,128,128)"
} else {
  colorVal = "rgb(0,0,0)"
}

if (pinValues.Animal.length > 15){
  padVal = 10
} else {
  padVal = 40
}

return(
        <AutocompleteDropdown
        initialValue={{id: pinValues.DDVal}}
        textInputProps={{
            style: {
                backgroundColor: "transparent",
                borderRadius: 30,
                width: 100,
                height: 40,
                textAlign: "center",
                paddingLeft: padVal,
                color: colorVal,
                fontSize: 15
                
            }
        }}
        inputContainerStyle={{
          height: 40,
          borderRadius: 30,
          backgroundColor: "white",
          width: 200,
        }}
        dataSet={list}
        onSelectItem={(text) => handleConfirm(text)}
        onChangeText={(text) => handleConfirm(text)}
        showChevron={false}
        showClear={true}
        closeOnBlur={true}
        />  
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: 200,
      backgroundColor: "pink",
      borderRadius: 20,
      marginLeft: -55,
      zIndex: 1,
      height: 0
    },
   
  });