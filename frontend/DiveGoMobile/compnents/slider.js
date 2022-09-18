import React, { useContext, useEffect } from "react";
import { Platform } from "react-native";
import Slider from "@react-native-community/slider";
import { SliderContext } from "./contexts/sliderContext";
import { MonthSelectContext } from "./contexts/monthSelectContext";

export default function MonthSlider() {
  const { sliderVal, setSliderVal } = useContext(SliderContext);
  const { setMonthVal } = useContext(MonthSelectContext);

  useEffect(() =>{
  switch (sliderVal) {
    case 1:
      setMonthVal("Jan")
      break;
    case 2:
      setMonthVal("Feb")
      break;
    case 3:
      setMonthVal("Mar")
      break;
    case 4:
      setMonthVal("Apr")
      break;
    case 5:
      setMonthVal("May")
      break;
    case 6:
      setMonthVal("Jun")
      break;
    case 7:
      setMonthVal("Jul")
      break;
    case 8:
      setMonthVal("Aug")
      break;
    case 9:
      setMonthVal("Sep")
      break;
    case 10:
      setMonthVal("Oct")
      break;
    case 11:
      setMonthVal("Nov")
      break;
    case 12:
      setMonthVal("Dec")
      break;
  }
},[sliderVal])

  let sliderColor
  if (Platform.OS === 'ios'){
    sliderColor = "black"
  } else {
    sliderColor = "grey"
  }

  return (
      <Slider
        style={{
          width: '95%',
          height: 30,
          transform: [{ scaleX: 1.05 }, { scaleY: 0.7 }],
        }}
        minimumValue={1}
        maximumValue={12}
        value={sliderVal}
        onValueChange={(value) => setSliderVal(Math.round(value))}
        minimumTrackTintColor={sliderColor}
        maximumTrackTintColor="black"
        thumbTintColor="black"
        step={1}
        tapToSeek={true}
        disabled={false}
      />
  );
}

