import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import MultiSelect from 'react-native-multiple-select';
import { scale } from 'react-native-size-matters';
import { getAnimalMultiSelect } from "../supabaseCalls/photoSupabaseCalls";
import { AnimalMultiSelectContext } from "./contexts/animalMultiSelectContext";

export default function AnimalMultiSelect() {

  const { animalMultiSelection, setAnimalMultiSelection } = useContext(AnimalMultiSelectContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCreatures, setSelectedCreatures] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
     handleList(" ")
  }, []);

  useEffect(() => {
    setAnimalMultiSelection(selectedCreatures)
 }, [selectedCreatures]);


  const handleList = async (text) => {
    let list  = await getAnimalMultiSelect(text);
      setItems(list)
  }

  const handleSelections = async(selectArray) => {

    console.log("am i here?", selectArray)

    if (selectArray.length === 0){
      setSelectedCreatures([])
      setSelectedItems([])
    }
    let tempArray = []
    selectArray.forEach((selection) => {
    items.forEach((creature) => {
      if(creature.id === selection){
          tempArray.push(creature.label)
      }
    })
          setSelectedCreatures(tempArray)
          setSelectedItems(selectArray)  
})
}

  const handleClear = async(clearme) => {

    if(clearme.length === 1){
      setSelectedCreatures([])
      setSelectedItems([])
    }  
  
}
  console.log("who",selectedCreatures)
  console.log("why",selectedItems)

  return (
    <View style={{ position:'absolute', left: 120, top: 65, width: "50%", zIndex: 2}}>
        <MultiSelect
          hideTags={true}
          items={items}
          uniqueKey="id"
          ref={(component) => { multiSelect = component }}
          onSelectedItemsChange={(selectArray) => handleSelections(selectArray)}
          onClearSelector={(clearme) => handleClear(clearme)}
          selectedItems={selectedItems}
          selectText="Choose Sea Animals"
          searchInputPlaceholderText="Search Sea Animals..."
          onChangeInput={(text) => handleList(text)}
          displayKey="label"
          fontFamily="Lemonada_300Light"
          fontSize={10}
          altFontFamily="Lemonada_300Light"
          itemFontFamily="Lemonada_300Light"
          itemFontSize={10}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="label"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          searchInputStyle={{fontSize: 8, fontFamily: "Lemonada_300Light"}}
        />
        <View style={styles.lineItems}>{selectedItems.length > 0 &&  multiSelect.getSelectedItemsExt(selectedItems)}</View>
      </View>
  );
}

const styles = StyleSheet.create({
  lineItems:{
    display: "flex",
    flexDirection: "column",
    
  },
});
