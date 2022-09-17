import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Keyboard,
} from "react-native";
import { getAnimalNamesThatFit } from "../axiosCalls/photoAxiosCalls";
import AutoSuggestListItem from "./AutoSuggestListItem";
import { MaterialIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons";

export default function AnimalAutoSuggest(props) {
  const { setPin, pin } = props;

  const [list, setList] = useState([]);

  // useEffect(async() => {

  //   let filteredList = await getAnimalNamesThatFit('')
  //   console.log("meee", filteredList)

  // }, [])

  const handleChange = async (text) => {
    setPin({ ...pin, Animal: text });

    if (text.length > 0) {
      let newfilteredList = await getAnimalNamesThatFit(text);
      setList(newfilteredList);
    } else {
      setList([]);
    }
  };

  const handleClear = () => {
    setPin({ ...pin, Animal: "" });
    setList([]);
    Keyboard.dismiss()
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.suggestInput}
          placeholder={"Animal"}
          value={pin.Animal}
          placeholderTextColor="grey"
          color="black"
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
              key={animal.label}
              name={animal.label}
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
    flexDirection: "row",
  },
  xButton: {
    marginTop: 11,
    marginLeft: -28,
  },
  suggestInput: {
    borderRadius: 25,
    width: 200,
    height: 40,
    backgroundColor: "white",
    textAlign: "center",
    fontFamily: "IndieFlower_400Regular",
  },
});
