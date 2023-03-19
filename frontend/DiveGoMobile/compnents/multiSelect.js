// import React, { useState, useEffect, useContext } from "react";
// import { StyleSheet, View, Text } from "react-native";
// import MultiSelect from "react-native-multiple-select";
// import { scale } from "react-native-size-matters";
// import { getAnimalMultiSelect } from "../supabaseCalls/photoSupabaseCalls";
// import { AnimalMultiSelectContext } from "./contexts/animalMultiSelectContext";


// export default function AnimalMultiSelect() {
//   const { animalMultiSelection, setAnimalMultiSelection } = useContext(
//     AnimalMultiSelectContext
//   );
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedCreatures, setSelectedCreatures] = useState([]);
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     handleList("*");
//   }, []);

//   useEffect(() => {
//     console.log("ehat" , selectedCreatures)
//     setAnimalMultiSelection(selectedCreatures);
//   }, [selectedCreatures]);

//   const handleList = async (text) => {
//     if (text.length > 0) {
//       let newfilteredList = await getAnimalMultiSelect(text);

//       const animalArray = Array.from(
//         new Set(newfilteredList.map((a) => a.label))
//       ).map((label) => {
//         return newfilteredList.find((a) => a.label === label);
//       });
//       setItems(animalArray);
//     } else {
//       let newfilteredList = await getAnimalMultiSelect("*");
      
//       const animalArray = Array.from(
//         new Set(newfilteredList.map((a) => a.label))
//       ).map((label) => {
//         return newfilteredList.find((a) => a.label === label);
//       });
//       setItems(animalArray);
//     }
//   };
 
//   const handleSelections = async (selectArray) => {

//     console.log("getting", selectArray)
//     if (selectArray.length === 0) {
//       // setSelectedCreatures([]);
//       // setSelectedItems([]);
//     }

//     let tempArray = [];
//     let temp0Array = [];

//     selectArray.forEach((selection) => {
//       items.forEach((creature) => {
//         if (creature.id === selection) {
//           if(tempArray.includes(creature.label)){
//           } else {
//             tempArray.push(creature.label);
//             temp0Array.push(creature.id)
//           }
        
//         }
//       });

//       if (tempArray.length < selectArray.length){
  
//         setSelectedCreatures([...selectedCreatures, ...tempArray])
//         setSelectedItems(selectArray);
//         return
//       } else {
//         setSelectedCreatures(tempArray);
//         setSelectedItems(selectArray);
//       }

      
     
      
//     });
//   };

//   const handleClear = async (clearme) => {
//     if (clearme && clearme.length === 1) {
//       // setSelectedCreatures([]);
//       // setSelectedItems([]);
//     }
//   };

//   console.log("arrrr", selectedItems)
//   return (
//     <View
//       style={{
//         position: "absolute",
//         left: 120,
//         top: 65,
//         width: "50%",
//         zIndex: 2,
//       }}
//     >
//       <MultiSelect
//         hideTags={true}
//         items={items}
//         uniqueKey="id"
//         ref={(component) => {
//           multiSelect = component;
//         }}
//         onSelectedItemsChange={(selectArray) => handleSelections(selectArray)}
//         onClearSelector={(clearme) => handleClear(clearme)}
//         selectedItems={selectedItems}
//         selectText="Choose Sea Creatures"
//         searchInputPlaceholderText="Search Sea Animals..."
//         onChangeInput={(text) => handleList(text)}
//         displayKey="label"
//         fontFamily="Lemonada_300Light"
//         fontSize={10}
//         altFontFamily="Lemonada_300Light"
//         itemFontFamily="Lemonada_300Light"
//         itemFontSize={8}
//         tagRemoveIconColor="#CCC"
//         tagBorderColor="#CCC"
//         tagTextColor="#CCC"
//         selectedItemTextColor="#CCC"
//         selectedItemIconColor="#CCC"
//         itemTextColor="#000"
//         displayKey="label"
//         searchInputStyle={{ color: "#CCC" }}
//         submitButtonColor="lightblue"
//         submitButtonText="Submit"
//         searchInputStyle={{
//           backgroundColor: "transparent",
//           fontSize: 8,
//           fontFamily: "Lemonada_300Light",
//         }}
//         styleInputGroup={{
//           backgroundColor: "white",
//           borderRadius: 5,
//           marginTop: 2,
//           opacity: 0.7,
//           height: 25,
//         }}
//         styleItemsContainer={{
//           backgroundColor: "transparent",
//           opacity: 0.5,
//           borderRadius: 5,
//           borderColor: "transparent",
//           borderWidth: 1,
//         }}
//         styleDropdownMenu={{
//           backgroundColor: "transparent",
//           borderRadius: 10,
//           opacity: 0.8,
//           height: 25,
//         }}
//         styleDropdownMenuSubsection={{
//           backgroundColor: "transparent",
//           borderRadius: 5,
//           paddingTop: 10,
//           paddingBottom: 0,
//           paddingLeft: 10,
//           paddingRight: 10,
//           paddingBottom: 0,
//         }}
//         styleIndicator={{ opacity: 0.9, height: 27 }}
//         styleMainWrapper={{
//           backgroundColor: "transparent",
//           borderRadius: 15,
//           width: "125%",
//           marginLeft: scale(-40)
//         }}
//         styleListContainer={{
//           backgroundColor: "transparent",
//           marginTop: 5,
//           borderRadius: 5,
//         }}
//         styleItemsContainer={{
//           backgroundColor: "transparent",
//           borderRadius: 5,
//         }}
//         styleRowList={{ backgroundColor: "transparent", borderRadius: 5 }}
//         styleSelectorContainer={{ backgroundColor: "transparent" }}
//         styleTextDropdownSelected={{ backgroundColor: "transparent" }}
//         flatListProps={{ backgroundColor: "transparent", borderRadius: 10 }}
//         styleTextTag={{padding: 0, fontSize: 10, margin: 5}}
//       />
//       <View style={styles.lineItems}>
//         {selectedItems.length > 0 &&
//           multiSelect.getSelectedItemsExt(selectedItems)}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   lineItems: {
//     flexDirection: "row",
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: scale(335),
//     marginLeft: scale(-105),
//     // backgroundColor: 'pink'
//   },
// });
