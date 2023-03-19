import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";

const AnimalTag = (props) => {
  const { animalMultiSelection, setAnimalMultiSelection, animalName } = props;

  const handleClearTag = async (text) => {
    if (animalMultiSelection && animalMultiSelection.includes(text)) {
      setAnimalMultiSelection(
        animalMultiSelection.filter((item) => item !== text)
      );
    }
  };

  return (
    <View key={animalName} style={styles.tagBody} >
      <TouchableWithoutFeedback onPress={() => handleClearTag(animalName)}>
        <View style={[styles.tagBody]}>
          <View style={[styles.animalTag]}>
            <Text
              style={{
                color: "lightgrey",
                fontFamily: "PermanentMarker_400Regular",
                fontSize: scale(12),
                marginBottom: 2,
                marginLeft: 4,
                marginRight: 2
              }}
            >
              {animalName}
            </Text>
            <View style={styles.xButton}>
              <MaterialIcons
                name="highlight-remove"
                size={18}
                color="lightgrey"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  tagBody:{
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "lightgrey",
    height: 25
  },
  animalTag:{
    flexDirection: "row",
  },
  xButton:{
    marginTop: 2,
    marginRight: 2,
    marginBottom: 4
  }
});

export default AnimalTag;
