import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PinContext } from "./contexts/staticPinContext";

export default function DatePicker(showDatePicker) {
  const { pinValues, setPinValues } = useContext(PinContext);
  const [date, setDate] = useState(new Date())


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setPinValues({ ...pinValues, PicDate: currentDate });
  };

  return (
      showDatePicker &&  
      <DateTimePicker
        testID="dateTimrPicker"
        value={date}
        mode={"date"}
        display={"calendar"}
        onChange={onChange}
      />

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
    height: 500,
    width: 700,
    borderRadius: 15,
  },
});
