import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from "react-native";
// import { getAnimalNamesThatFit } from "../axiosCalls/photoAxiosCalls";
import { getAnimalNamesThatFit } from "../supabaseCalls/photoSupabaseCalls";
import AutoSuggestListItem from "./AutoSuggestListItem";
import { MaterialIcons } from "@expo/vector-icons";
import { scale } from 'react-native-size-matters';

export default function AnimalAutoSuggest(props) {
  const { setPin, pin, formValidation, SetFormValidation } = props;

  const [list, setList] = useState([]);

  const handleChange = async (text) => {
    setPin({ ...pin, Animal: text });
    SetFormValidation({...formValidation, AnimalVal: false})

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
    setPin({ ...pin, Animal: "" });
    setList([]);
    Keyboard.dismiss();
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={formValidation.AnimalVal ? styles.suggestInputRed : styles.suggestInput}
          placeholder={"Animal"}
          value={pin.Animal}
          placeholderTextColor="grey"
          color="#F0EEEB"
          onChangeText={handleChange}
        ></TextInput>
        {pin.Animal.length > 1 && (
          <TouchableWithoutFeedback onPress={handleClear}>
            <View style={styles.xButton}>
              <MaterialIcons
                name="highlight-remove"
                size={18}
                color="lightgrey"
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>

      {list.length > 0 &&
        list.map((animal) => {
          return (
            <AutoSuggestListItem
              key={animal}
              name={animal}
              pin={pin}
              setPin={setPin}
              setList={setList}
            />
          );
        })}
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
    marginTop: -20,
    marginLeft: -28,
  },
  suggestInput: {
    width: 200,
    height: 40,
    marginBottom: 20,
    backgroundColor: "#33586A",
    borderRadius: 10,
    // color: "#F0EEEB",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "IndieFlower_400Regular",
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
});
