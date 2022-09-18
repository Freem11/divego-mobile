import { StyleSheet, View, Text, Keyboard } from "react-native";

const AutoSuggestListItem = (props) => {
  const { setList, setPin, pin, name } = props;

  const handleSelect = (text) => {
    setPin({ ...pin, Animal: text });
    setList([]);
    Keyboard.dismiss();
  };

  return (
    <View id={name} style={styles.suggestion}>
      <View>
        <Text
          style={{ fontFamily: "IndieFlower_400Regular", textAlign: "center" }}
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
    width: 165,
    height: 25,
    marginTop: 1,
    paddingTop: 3,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    textAlign: "center",
    alignContent: "center",
    listStyle: "none",
    transform: [{ translateX: 25 }],
  },
});

export default AutoSuggestListItem;
