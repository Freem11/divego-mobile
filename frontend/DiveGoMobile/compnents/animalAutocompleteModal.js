import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { Autocomplete } from "react-native-autocomplete-input";
import { PinContext } from "./contexts/staticPinContext";
import { photos } from "./data/testdata";
import filterCreatures from "./helpers/optionHelpers";
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
  const [list, setList] = useState(filterCreatures(photos, pinValues.Animal));

  let colorVal;
  let padVal;

  useEffect(() => {
    if (pinValues.Animal.length === 0 || pinValues.Animal === undefined) {
      setPinValues({ ...pinValues });
    }
    setList(filterCreatures(photos, pinValues.Animal));

  }, []);

  const handleConfirm = (animal) => {

    if (animal !== null) {
      if (typeof animal === "object") {
        setPinValues({
          ...pinValues,
          Animal: animal.title.toString(),
          DDVal: animal.id.toString(),
        });
      } else {
        setPinValues({ ...pinValues, Animal: animal, DDVal: "0" });
      }
      setList(filterCreatures(photos, pinValues.Animal));
    }
  };

 

  if (pinValues.Animal === "Animal") {
    colorVal = "rgb(128,128,128)";
  } else {
    colorVal = "rgb(0,0,0)";
  }

  if (pinValues.Animal.length > 15) {
    padVal = 10;
  } else {
    padVal = 40;
  }

  const handleClear = (animal) => {
    setPinValues({ ...pinValues, Animal: "Animal", DDVal: "0" });
    setList(filterCreatures(photos, "Animal"));
  };

  if (!list) {
    setList(photos)
  }
  

  return (
    <AutocompleteDropdown
      initialValue={{ id: pinValues.DDVal }}
      textInputProps={{
        style: {
          backgroundColor: "transparent",
          borderRadius: 30,
          width: 100,
          height: 40,
          textAlign: "center",
          paddingLeft: padVal,
          color: colorVal,
          fontSize: 15,
        },
      }}
      inputContainerStyle={{
        height: 40,
        borderRadius: 30,
        backgroundColor: "white",
        width: 200,
        zIndex: 2,
      }}
      dataSet={list}
      onSelectItem={(text) => handleConfirm(text)}
      onChangeText={(text) => handleConfirm(text)}
      showChevron={false}
      showClear={true}
      closeOnBlur={true}
      onClear={(text) => handleClear(text)}
    />
  );
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
    height: 0,
  },
});
