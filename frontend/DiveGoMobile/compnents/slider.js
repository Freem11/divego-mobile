import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Slider, Text } from "react-native";

export default function MonthSlider() {
  const [month, setMonth] = useState(8);

  let monthVal;

  switch (month) {
    case 1:
      monthVal = "Jan";
      break;
    case 2:
      monthVal = "Feb";
      break;
    case 3:
      monthVal = "Mar";
      break;
    case 4:
      monthVal = "Apr";
      break;
    case 5:
      monthVal = "May";
      break;
    case 6:
      monthVal = "Jun";
      break;
    case 7:
      monthVal = "Jul";
      break;
    case 8:
      monthVal = "Aug";
      break;
    case 9:
      monthVal = "Sep";
      break;
    case 10:
      monthVal = "Oct";
      break;
    case 11:
      monthVal = "Nov";
      break;
    case 12:
      monthVal = "Dec";
      break;
  }

  return (
    <View style={styles.container}>
      <Text>{monthVal}</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={1}
        maximumValue={12}
        onValueChange={(value) => setMonth(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2
  },
});
