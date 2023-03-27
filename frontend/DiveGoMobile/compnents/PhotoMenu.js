import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import {
  picClickheatPoints,
  multiHeatPoints,
} from "../supabaseCalls/heatPointSupabaseCalls";
import {
  getPhotosforAnchor,
  getPhotosforAnchorMulti,
  getPhotosforMapArea,
} from "../supabaseCalls/photoSupabaseCalls";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
// import { getPhotosforAnchor } from "../../axiosCalls/photoAxiosCalls";
// import { SliderContext } from "../contexts/sliderContext";
// import { MonthSelectContext } from "../contexts/monthSelectContext";
// import { SelectedDiveSiteContext } from "../contexts/selectedDiveSiteContext";
// import { AnimalSelectContext } from "../contexts/animalSelectContext";
import { AnimalMultiSelectContext } from "./contexts/animalMultiSelectContext";
import { HeatPointsContext } from "./contexts/heatPointsContext";
import { MapBoundariesContext } from "./contexts/mapBoundariesContext";
// import { newGPSBoundaries } from "../helpers/mapHelpers";
import { scale } from "react-native-size-matters";
import { formatHeatVals } from "./helpers/mapHelpers";
import PhotoMenuListItem from "./photoMenuListItem";

let SCREEN_WIDTH = Dimensions.get("window").width;

export default function PhotoMenu() {
  // const { sliderVal } = useContext(SliderContext);
  // const { selectedDiveSite } = useContext(SelectedDiveSiteContext);
  // const [anchorPics, setAnchorPics] = useState([]);
  // const { monthVal } = useContext(MonthSelectContext);
  // const { animalSelection } = useContext(AnimalSelectContext);
  const { animalMultiSelection, setAnimalMultiSelection } = useContext(
    AnimalMultiSelectContext
  );
  const { boundaries, setBoundaries } = useContext(MapBoundariesContext);
  const { newHeat, setNewHeat } = useContext(HeatPointsContext);
  const [areaPics, setAreaPics] = useState([]);

  const [picMenuSize, setPicMenuSize] = useState(0);

  useEffect(() => {
    setPicMenuSize(areaPics.length*120)
  }, [])

  useEffect(() => {
    setPicMenuSize(areaPics.length*120)
  }, [areaPics.length])

  const xValue = useSharedValue(0);
  const context = useSharedValue({x:0});
 
  const animatePicMenu = Gesture.Pan()
  .onBegin(()=>{
    if (xValue.value > (picMenuSize /2)-180){
      xValue.value = (picMenuSize/2)- 175
    } else if (xValue.value < (-picMenuSize /2)+180){
      xValue.value = (-picMenuSize/2)+ 175
    }
  })
  .onStart(() => {
    context.value = {x: xValue.value }
  })
  .onUpdate((event) => {
    console.log(event)
    if (event.velocityX > 500 || event.velocityX < -500){
      xValue.value = ((event.translationX * 2) + context.value.x)
    } else if (event.velocityX > 700 || event.velocityX < -700){
      xValue.value = ((event.translationX * 3) + context.value.x)
    } else {
      xValue.value = event.translationX + context.value.x
    } 
  })
  .onEnd((event) => {
    console.log("where", xValue.value, picMenuSize/2)
      if (xValue.value > (picMenuSize /2)-180){
        xValue.value = (picMenuSize/2)- 175
      } else if (xValue.value < (-picMenuSize /2)+180){
        xValue.value = (-picMenuSize/2)+ 175
      }
  });

  const animatedPictureStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(xValue.value, {duration: 400, easing: Easing.inOut(Easing.linear)}),
        },
      ],
    };
  });

  const filterPhotosForMapArea = async () => {
    if (boundaries[0] > boundaries[2]) {
      try {
        const AmericanPhotos = await getPhotosforMapArea({
          minLat: boundaries[1],
          maxLat: boundaries[3],
          minLng: -180,
          maxLng: boundaries[2],
        });
        const AsianPhotos = await getPhotosforMapArea({
          minLat: boundaries[1],
          maxLat: boundaries[3],
          minLng: boundaries[0],
          maxLng: 180,
        });

        let photos = [...AsianPhotos, ...AmericanPhotos];

        if (photos) {
          const animalArray = Array.from(
            new Set(photos.map((a) => a.label))
          ).map((label) => {
            return photos.find((a) => a.label === label);
          });

          setAreaPics(animalArray);
        }
      } catch (e) {
        console.log({ title: "Error", message: e.message });
      }
    } else {
      try {
        const photos = await getPhotosforMapArea({
          minLat: boundaries[1],
          maxLat: boundaries[3],
          minLng: boundaries[0],
          maxLng: boundaries[2],
        });
        if (photos) {
          const animalArray = Array.from(
            new Set(photos.map((a) => a.label))
          ).map((label) => {
            return photos.find((a) => a.label === label);
          });

          setAreaPics(animalArray);
        }
      } catch (e) {
        console.log({ title: "Error", message: e.message });
      }
    }
  };

  const filterHeatPointsForMapArea = async () => {
    try {
      const localHeatPoints = await multiHeatPoints(
        {
          minLat: boundaries[1],
          maxLat: boundaries[3],
          minLng: boundaries[0],
          maxLng: boundaries[2],
        },
        animalMultiSelection
      );
      if (localHeatPoints) {
        setNewHeat(formatHeatVals(localHeatPoints));
      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  useEffect(() => {
    filterPhotosForMapArea();
  }, []);

  useEffect(() => {
    filterHeatPointsForMapArea();
  }, [setAnimalMultiSelection]);

  useEffect(() => {
    filterPhotosForMapArea();
  }, [boundaries]);

  return (
    <GestureDetector gesture={animatePicMenu}>
    <Animated.View style={[styles.container2, animatedPictureStyle]}>
      {areaPics &&
        areaPics.map((pic) => {
          return (
            <PhotoMenuListItem 
            pic={pic}
            setAnimalMultiSelection={setAnimalMultiSelection}
            animalMultiSelection={animalMultiSelection}
            />
          );
        })}
    </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container2: {
    // flex: 1,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    top: 20,
    minWidth: SCREEN_WIDTH,
    // backgroundColor: 'green'
  },
  picContainer2: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 0,
    marginTop: scale(10),
  },

  titleText: {
    textAlign: "center",
    fontFamily: "IndieFlower_400Regular",
    color: "#F0EEEB",
    fontSize: scale(15),
    marginLeft: scale(12),
  },
  noSightings: {
    width: scale(200),
    alignItems: "center",
    textAlign: "center",
    marginTop: scale(15),
    fontFamily: "IndieFlower_400Regular",
    fontSize: scale(15),
    color: "#F0EEEB",
  },

});
