import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text, TextInput } from "react-native";
import { getAnimalNamesThatFit } from "../axiosCalls/photoAxiosCalls";
import AutoSuggestListItem from "./AutoSuggestListItem";

export default function AnimalAutoSuggest(props) {

  const { setPin, pin } = props

  const [list, setList] = useState([])

  // useEffect(async() => {

  //   let filteredList = await getAnimalNamesThatFit('')
  //   console.log("meee", filteredList)
   
  // }, [])

  const handleChange = async(text) => {
      setPin({...pin, Animal: text})

      if(text.length > 0){
        let newfilteredList  =  await getAnimalNamesThatFit(text)
        setList(newfilteredList)
      } else {
        setList([])
      }

  }

  return (
  <View>
      <TextInput
        style={styles.suggestInput}
        placeholder={"Animal"}
        value={pin.Animal}
        placeholderTextColor="grey"
        color="black"
        onChangeText={handleChange}
        ></TextInput>

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
})
} 
  </View>
  );
}

const styles = StyleSheet.create({
  suggestInput:{
    borderRadius: 25,
    width: 200,
    height: 40,
    backgroundColor: 'white',
    textAlign: 'center',
    fontFamily: 'IndieFlower_400Regular',
  }
});