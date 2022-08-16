import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { photos } from "./data/testdata";
import filterCreatures from "./helpers/optionHelpers"

export default function AnimalAutoComplete() {

const [searchVal, setSearchVal] = useState('')
const list = filterCreatures(photos);
console.log("list", searchVal)

return(
    <View style={styles.container}>
        <AutocompleteDropdown
        textInputProps={{
            style: {
                backgroundColor: "white",
                borderRadius: 25,
                width: 200,
                
            }
        }}
        dataSet={list}
        onSelectItem={setSearchVal}
        showChevron={false}
        showClear={false}
        closeOnBlur={true}
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