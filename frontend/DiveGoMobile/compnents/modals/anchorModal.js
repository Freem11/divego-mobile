import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { getPhotosforAnchor } from "../../axiosCalls/photoAxiosCalls";
import { SliderContext } from "../contexts/sliderContext";
import { MonthSelectContext } from "../contexts/monthSelectContext";
import { SelectedDiveSiteContext } from "../contexts/selectedDiveSiteContext";
import { newGPSBoundaries } from "../helpers/mapHelpers";
import { s, scale } from 'react-native-size-matters';

let IPSetter = 1
let IP
//Desktop = 10.0.0.253
//Laptop = 10.0.0.68
//Library = 10.44.22.110

if (IPSetter === 1) {
  IP = '10.0.0.253'
} else if (IPSetter === 2){
  IP = '10.0.0.68'
} else if (IPSetter === 3){
  IP = '10.44.22.110'
}

let filePath = `/Users/matthewfreeman/divego/wetmap/src/components/uploads/`

export default function AnchorModal(lat, lng) {

  const { sliderVal } = useContext(SliderContext);
  const { selectedDiveSite } = useContext(SelectedDiveSiteContext)
  const [anchorPics, setAnchorPics] = useState([]);
  const { monthVal } = useContext(MonthSelectContext);


  const filterAnchorPhotos = async () => {

    let { minLat, maxLat, minLng, maxLng } = newGPSBoundaries(selectedDiveSite.Latitude, selectedDiveSite.Longitude)

    try {
      const photos = await getPhotosforAnchor({sliderVal, minLat, maxLat, minLng, maxLng});
      if (photos) {
        setAnchorPics(photos);
      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  useEffect(() => {
    filterAnchorPhotos()
  }, []);


  return (
    <View>
      <Text style={{ fontFamily: "Caveat_400Regular", fontSize: scale(20), marginLeft: scale(20) }}>{monthVal} Sightings</Text>
    <ScrollView>
       <View style={styles.container}>
      {anchorPics && anchorPics.map((pic) => {
          return(<View key={pic.id} style={styles.picContainer}>
            <Text style={styles.titleText}>{pic.label}</Text>
          <Image
            source={{ uri: filePath + pic.photofile}}
            style={{  height: "100%", width: "100%", borderRadius: 15, borderColor: "grey" }}
          /></View>)
        })}
        {anchorPics.length === 0 && <Text style={styles.noSightings}>No Sightings At This Site Yet For This Time Of Year!</Text>}
        </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8DBE2",
    alignItems: "center",
    marginBottom: "30%",
    marginTop: "5%",
    marginRight: scale(10),
    marginLeft: scale(10),
  },
  picContainer: {
    width: scale(200),
    height: scale(100),
  },
  titleText: {
    textAlign: "center",
    fontFamily: "IndieFlower_400Regular",
    fontSize: scale(15)
  },
  noSightings: {
    width: scale(200),
    alignItems: "center",
    textAlign: "center",
    marginTop: scale(15),
    fontFamily: "IndieFlower_400Regular",
    fontSize: scale(15)
  }
})