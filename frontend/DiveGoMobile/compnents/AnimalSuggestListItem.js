import { StyleSheet, View, Text, Keyboard } from "react-native";

const AnimalSuggestListItem = (props) => {
  const { setList, setAnimalSelection, animalSelection, name, setAnimalText, animalText} = props;

  const handleSelect = (text) => {

    if (animalSelection.includes(text)){
      setAnimalSelection(animalSelection.filter(item => item !== text));
    } else {
      setAnimalSelection([...animalSelection, text]);
    }
    
    setAnimalText(text);
    // setList([]);
    Keyboard.dismiss();
    
  };

  return (
    <View id={name} style={animalSelection.includes(name) ? styles.selected : styles.suggestion}>
      <View>
        <Text
          style={animalSelection.includes(name) ? styles.textSelected : styles.textReg}
          onPress={() => handleSelect(name)}
        >
          {name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  suggestion: {
    // position: "absolute",
    width: 165,
    height: 25,
    marginTop: 1,
    paddingTop: 3,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    alignContent: "center",
    listStyle: "none",
    opacity: 1,
    transform: [{  translateY: 0 }],
  },
  selected: {
    width: 165,
    height: 25,
    marginTop: 1,
    paddingTop: 3,
    backgroundColor: "lightgrey",
    textAlign: "center",
    alignContent: "center",
    listStyle: "none",
    opacity: 1,
    transform: [{  translateY: 0 }],
  },
  textReg:{
    fontFamily: "IndieFlower_400Regular",
    textAlign: "center",
    color:"black"
  },
  textSelected:{
    fontFamily: "IndieFlower_400Regular",
    textAlign: "center",
    color:"grey"
  }
});

export default AnimalSuggestListItem;
