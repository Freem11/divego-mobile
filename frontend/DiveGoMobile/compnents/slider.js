import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Slider from '@react-native-community/slider';

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
      <Text style={{fontWeight: 'bold'}}>{monthVal}</Text>
      <Slider
        style={{ width: 300, height: 30,transform: [{scaleX: 1}, {scaleY: 0.8}]}}
        minimumValue={1}
        maximumValue={12}
        value={month}
        onValueChange={(value) => setMonth(Math.round(value))}
        minimumTrackTintColor="black"
        maximumTrackTintColor="black"
        thumbTintColor="black"
        step={12}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    backgroundColor: "white",
    opacity: 0.6,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    top: 30,
    height: 55,
    borderRadius: 15 
    
  },
});
