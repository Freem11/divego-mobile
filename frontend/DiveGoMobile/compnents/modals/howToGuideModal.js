import { StyleSheet, Text, View, ScrollView } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function GuideModal() {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.textSt}>
        Welcome to DiveGo, this app is designed for divers who love to interact
        with animals
      </Text>
      <Text style={styles.textSt}>
        The premise is simple, anchor icons show you the locations of dive sites
        and heat map dots show you where and at what time of year an animal has
        been spotted there in the past, with the dot intensity increasing with
        the more sightings in that month at a given location.
      </Text>
      <Text style={styles.textSt}>
        Change the month by adjusting the month slider at the top of the page.
      </Text>
      <Text style={styles.textSt}>
        Users submit photos of animals and dive sites they have seen/ been to
        and the app will capture the date that the photo was created and if the
        photo carries them, its GPS coordinates, if not an option is available
        to drop a pin at the location the photo was taken.
      </Text>

      <View style={styles.bottomSec}>
        <View style={styles.leftSide}>
          <MaterialIcons name="explore" color="black" size={24} style={{height: 100}}/>
          <MaterialIcons name="photo-camera" color="black" size={24} style={{height: 195}}/>
          <MaterialIcons name="add-location-alt" color="black" size={24} style={{height: 145}}/>
          <MaterialIcons name="search" color="black" size={24} style={{height: 108}}/>
          <MaterialIcons name="anchor" color="black" size={24} style={{height: 68}}/>
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.blurb}>
            Click this icon to change the map to another location, type in the
            name of the city or town closest to where you want to search, hit
            enter and it will take you there.
          </Text>
          <Text style={styles.blurb}>
            Click this icon to toggle the photo uploader window, in this window
            you can upload photos of the animals you have seen, the system will
            take the date the photo was taken as well as the GPS coordinates, if
            they are part of the photo, if not click the red pin icon to the
            right of the fields to open another map page to drop a pin. Doing so
            will generate a set of GPS cooridnates for you photo.
          </Text>
          <Text style={styles.blurb}>
            Click this icon to toggle the add dive site window, in this window
            you can upload a photo from your dive site and it will pull the GPS
            coordinates, all you need to do is add the site name, and if you
            dont have a photo please drop your lat and lng coordianted in
            fields.
          </Text>
          <Text style={styles.blurb}>
            Click this icon to change what sea creature you are looking for,
            this list is made up of creatures that already exist in the system,
            so add new ones with your own photos to expand the list!
          </Text>
          <Text style={styles.blurb}>
            Click this icon to toggle the dive site anchors on and off, this
            will allow you to see the heat dots more easily when needed.
          </Text>
        </View>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8DBE2",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  textSt: {
    marginBottom: 10,
  },
  bottomSec: {
    flex: 1,
    flexDirection: "row",
    marginRight: 40,
    marginLeft: 0,
  },
  leftSide: {
      marginRight: 10,
      marginTop: 10
  },
  blurb: {
    marginTop: 10
  }
});
