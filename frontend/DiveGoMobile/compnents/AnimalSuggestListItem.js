import { StyleSheet, View, Text, Keyboard } from "react-native";

const AnimalSuggestListItem = (props) => {
  const { setList, setAnimalSelection, animalSelection, name, setAnimalText, animalText} = props;

  const handleSelect = (text) => {
    setAnimalSelection(text);
    setAnimalText({ Name: text });
    setList([]);
    Keyboard.dismiss();
  };

  return (
    <View id={name} style={styles.suggestion}>
      <View>
        <Text
          style={{ fontFamily: "IndieFlower_400Regular", textAlign: "center", color:"black" }}
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
    borderRadius: 3,
    textAlign: "center",
    alignContent: "center",
    listStyle: "none",
    opacity: 1,
    transform: [{  translateY: 0 }],
  },
});

export default AnimalSuggestListItem;
