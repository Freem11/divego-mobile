import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { getPhotosforAnchor } from "../../supabaseCalls/photoSupabaseCalls";
// import { getPhotosforAnchor } from "../../axiosCalls/photoAxiosCalls";
import { SliderContext } from "../contexts/sliderContext";
import { MonthSelectContext } from "../contexts/monthSelectContext";
import { SelectedDiveSiteContext } from "../contexts/selectedDiveSiteContext";
import { AnimalSelectContext } from "../contexts/animalSelectContext";
import { newGPSBoundaries } from "../helpers/mapHelpers";
import { scale } from "react-native-size-matters";
import Lightbox from "react-native-lightbox-v2";
import { FontAwesome } from "@expo/vector-icons";
import email from 'react-native-email'

let IPSetter = 2;
let IP;
//Desktop = 10.0.0.253
//Laptop = 10.0.0.68
//Library = 10.44.22.110

if (IPSetter === 1) {
  IP = "10.0.0.253";
} else if (IPSetter === 2) {
  IP = "10.0.0.68";
} else if (IPSetter === 3) {
  IP = "10.44.22.110";
}

let filePath = `/Users/matthewfreeman/divego/wetmap/src/components/uploads/`;

export default function AnchorModal(lat, lng) {
  const { sliderVal } = useContext(SliderContext);
  const { selectedDiveSite } = useContext(SelectedDiveSiteContext);
  const [anchorPics, setAnchorPics] = useState([]);
  const { monthVal } = useContext(MonthSelectContext);
  const { animalSelection } = useContext(AnimalSelectContext)


  const filterAnchorPhotos = async () => {
    let { minLat, maxLat, minLng, maxLng } = newGPSBoundaries(
      selectedDiveSite.Latitude,
      selectedDiveSite.Longitude
    );

    try {
      const photos = await getPhotosforAnchor({
        animalSelection,
        sliderVal,
        minLat,
        maxLat,
        minLng,
        maxLng,
      });
      if (photos) {
        setAnchorPics(photos);
      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  useEffect(() => {
    filterAnchorPhotos();
  }, []);

  const handleEmail = (pic) => {
    const to = ['DiveGo2022@gmail.com']
    email(to, {
        // Optional additional arguments
        subject: `Reporting issue with picture: "${pic.label}" - ${pic.photoFile} `,
        body: 'Type of issue: \n \n 1) Animal name not correct \n (Please provide correct animal name and we will correct the record)\n \n 2)Copy write image claim \n (Please provide proof that you own the submitted photo and we will remove it as you have requested)',
        checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error)
}

  return (
    <View style={{ maxHeight: "83%" }}>
      <Text
        style={{
          fontFamily: "Caveat_400Regular",
          fontSize: scale(20),
          marginLeft: scale(20),
          color: "#F0EEEB",
        }}
      >
        {monthVal} Sightings
      </Text>
      <ScrollView>
        <View style={styles.container}>
          {anchorPics &&
            anchorPics.map((pic) => {
              return (
                <View key={pic.id} style={styles.picContainer}>
                  <View style={styles.micro}>
                  <FontAwesome name="flag" color="maroon" size={20} onLongPress={() => handleEmail(pic)} />
                  <Text style={styles.titleText}>{pic.label}</Text>
                  </View>
                  <Lightbox activeProps={{height: '30%'}}>
                    <View style={styles.shadowbox}>
                      <Image
                        source={{
                          uri: `https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${pic.photoFile}`,
                        }}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: 15,
                          borderColor: "grey",
                        }}
                      />
                    </View>
                  </Lightbox>
                </View>
              );
            })}
          {anchorPics.length === 0 && (
            <Text style={styles.noSightings}>
              No Sightings At This Site Yet For This Time Of Year!
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#355D71",
    alignItems: "center",
    marginBottom: "30%",
    marginTop: "5%",
    marginRight: scale(10),
    marginLeft: scale(10),
  },
  picContainer: {
    width: scale(200),
    height: scale(100),
    marginBottom: scale(30),
  },
  shadowbox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  titleText: {
    textAlign: "center",
    fontFamily: "IndieFlower_400Regular",
    color: "#F0EEEB",
    fontSize: scale(15),
    marginLeft: scale(12)
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
  micro: {
    display: "flex",
    flexDirection: "row"
  }
});
