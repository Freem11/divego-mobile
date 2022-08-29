import React, { useState, useRef, useEffect, useContext } from "react";
import GuideModal from "./modals/howToGuideModal";
import DiveSiteModal from "./modals/diveSiteAdderModal";
import PicUploadModal from "./modals/picUploaderModal";
import { DiveSitesContext } from "./contexts/diveSiteToggleContext";
import { PictureAdderContext } from "./contexts/picModalContext";
import { PinContext } from "./contexts/staticPinContext";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
  Text, KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AnimalAutoComplete from "./animalAutocomplete";
import GeocodeAutocomplete from "./geocodeAutocomplete";
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function FABButtons() {
  const { diveSitesTog, setDiveSitesTog } = useContext(DiveSitesContext);
  const { pinValues, setPinValues } = useContext(PinContext);

  const { picAdderModal, setPicAdderModal } = useContext(PictureAdderContext);
  const [diveSiteAdderModal, setDiveSiteAdderModal] = useState(false);
  const [guideModal, setGuideModal] = useState(false);

  const rotationVal = useSharedValue(0);
  const transYanchor = useSharedValue(0);
  const transYsearch = useSharedValue(0);
  const transYsite = useSharedValue(0);
  const transYphoto = useSharedValue(0);
  const transYgeo = useSharedValue(0);
  const transYinfo = useSharedValue(0);

  const animalWidth = useSharedValue(0);
  const geocodeWidth = useSharedValue(0);

  const rotation = useDerivedValue(() => {
    return interpolate(rotationVal.value, [0, 45], [0, 45]);
  });

  const animatedRotation = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value + "deg" }],
    };
  });

  const startButtonAnimations = () => {
    if (rotationVal.value === 45) {
      rotationVal.value = withSpring(0);
      transYanchor.value = withTiming(0);
      transYsearch.value = withTiming(0);
      transYsite.value = withTiming(0);
      transYphoto.value = withTiming(0);
      transYgeo.value = withTiming(0);
      transYinfo.value = withTiming(0);
      animalWidth.value = withTiming(0);
      geocodeWidth.value = withTiming(0);
    } else {
      rotationVal.value = withSpring(45);
      transYanchor.value = withSpring(-65);
      transYsearch.value = withSpring(-115);
      transYsite.value = withSpring(-165);
      transYphoto.value = withSpring(-215);
      transYgeo.value = withSpring(-265);
      transYinfo.value = withSpring(-315);
    }
  };

  const scale = useDerivedValue(() => {
    return interpolate(animalWidth.value, [0, 200], [0, 1]);
  });

  const animalReveal = useAnimatedStyle(() => {
    return {
      transform: [{ scaleX: -scale.value }],
    };
  });

  const startAnimalButtonAnimations = () => {
    if (animalWidth.value === 0) {
      animalWidth.value = withTiming(200);
    } else {
      animalWidth.value = withTiming(0);
    }
  };

  const scaleGeo = useDerivedValue(() => {
    return interpolate(geocodeWidth.value, [0, 200], [0, 1]);
  });

  const geocodeReveal = useAnimatedStyle(() => {
    return {
      transform: [{ scaleX: -scaleGeo.value }],
    };
  });

  const startGeoCodeButtonAnimations = () => {
    if (geocodeWidth.value === 0) {
      geocodeWidth.value = withTiming(200);
    } else {
      geocodeWidth.value = withTiming(0);
    }
  };

  const transAnchorY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transYanchor.value }],
    };
  });

  const transSearchY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transYsearch.value }],
    };
  });

  const transSiteY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transYsite.value }],
    };
  });

  const transPhotoY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transYphoto.value }],
    };
  });

  const transGeoY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transYgeo.value }],
    };
  });

  const transInfoY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transYinfo.value }],
    };
  });

  const togglePicModal = () => {
    setPicAdderModal(!picAdderModal);

    if (picAdderModal) {
      setPinValues({
        PicFile: null,
        Animal: "Animal",
        PicDate: "",
        Latitude: "",
        Longitude: "",
        DDVal: "0"
      });
    }
  };

  const AnimalKeboardOffset = Platform.OS === "ios" ? 10 : 0;


  return (
    <View style={styles.fab}>
      <TouchableWithoutFeedback onPress={() => setGuideModal(!guideModal)}>
        <Animated.View
          style={[styles.buttonwrapper, styles.questionWrapper, transInfoY]}
        >
          <FontAwesome5 name="question" color="aquamarine" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={startGeoCodeButtonAnimations}>
        <Animated.View
          style={[styles.buttonwrapper, styles.exploreWrapper, transGeoY]}
        >
          <MaterialIcons name="explore" color="aquamarine" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => setPicAdderModal(!picAdderModal)}
      >
        <Animated.View
          style={[styles.buttonwrapper, styles.cameraWrapper, transPhotoY]}
        >
          <MaterialIcons name="photo-camera" color="aquamarine" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => setDiveSiteAdderModal(!diveSiteAdderModal)}
      >
        <Animated.View
          style={[styles.buttonwrapper, styles.addSiteWrapper, transSiteY]}
        >
          <MaterialIcons name="add-location-alt" color="aquamarine" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={startAnimalButtonAnimations}>
        <Animated.View
          style={[styles.buttonwrapper, styles.searchWrapper, transSearchY]}
        >
          <MaterialIcons name="search" color="aquamarine" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => setDiveSitesTog(!diveSitesTog)}>
        <Animated.View
          style={[styles.buttonwrapper, styles.anchorWrapper, transAnchorY]}
        >
          <MaterialIcons name="anchor" color="aquamarine" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={startButtonAnimations}>
        <Animated.View
          style={[
            styles.topbuttonwrapper,
            styles.menuWrapper,
            animatedRotation,
          ]}
        >
          <FontAwesome5 name="plus" color="black" size={32} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.animal, animalReveal]}>
        <AnimalAutoComplete/>
      </Animated.View>

      <Animated.View style={[styles.geoCoder, geocodeReveal]}>
        <GeocodeAutocomplete />
      </Animated.View>

      <Modal visible={picAdderModal} animationType="slide" transparent={true}>
          <View style={styles.modalStyle}>
          <View style={styles.title}>
            <View>
              <Text style={styles.header}>Please Submit Your Picture</Text>
            </View>
            <TouchableWithoutFeedback onPress={togglePicModal}>
              <View style={styles.closeButton}>
                <FontAwesome name="close" color="aquamarine" size={32} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <PicUploadModal />
          </View>
      </Modal>

      <Modal
        visible={diveSiteAdderModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalStyle}>
        <View style={styles.title}>
          <View>
            <Text style={styles.header}>Please Submit Your Dive Site</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => setDiveSiteAdderModal(!diveSiteAdderModal)}
          >
            <View style={styles.closeButton}>
              <FontAwesome name="close" color="aquamarine" size={32} />
            </View>
          </TouchableWithoutFeedback>
          </View>
          <DiveSiteModal />
        </View>
      </Modal>

      <Modal visible={guideModal} animationType="slide" transparent={true}>
        <View style={styles.modalStyle}>
        <View style={styles.titleAlt}>
        <View>
            <Text style={styles.headerAlt}>How to Use DiveGo</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => setGuideModal(!guideModal)}>
            <View style={styles.closeButton}>
              <FontAwesome name="close" color="aquamarine" size={32} />
            </View>
          </TouchableWithoutFeedback>
          </View>
          <GuideModal />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    zIndex: 2,
    bottom: 30,
    height: 10,
    width: 60,
    right: 20,
    backgroundColor: "transparent",
  },
  topbuttonwrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    height: 55,
    width: 55,
    opacity: 0.7,
  },
  buttonwrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    height: 45,
    width: 45,
    opacity: 0.7,
    backgroundColor: "black",
  },
  menuWrapper: {
    backgroundColor: "aquamarine",
    bottom: 0,
    opacity: 1,
  },
  anchorWrapper: {
    bottom: 0,
  },
  searchWrapper: {
    bottom: 0,
  },
  addSiteWrapper: {
    bottom: 0,
  },
  cameraWrapper: {
    bottom: 0,
  },
  exploreWrapper: {
    bottom: 0,
  },
  questionWrapper: {
    bottom: 0,
  },
  animal: {
    bottom: 148,
    width: 0,
    right: 30,
    borderRadius: 10,
    zIndex: 2,
  },
  geoCoder: {
    bottom: 308,
    width: 0,
    right: 40,
    borderRadius: 10,
    zIndex: 2,
  },
  modalStyle: {
    flex: 1,
    backgroundColor: "#D8DBE2",
    borderRadius: 25,
    margin: 30,
    borderColor: "lightblue",
    borderWidth: 8,
    opacity: 1,
  },
  closeButton: {
    borderRadius: 42 / 2,
    backgroundColor: "maroon",
    height: 42,
    width: 42,
    marginLeft: 240,
    marginTop: -75,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 25,
    marginTop: 0,
    width: "70%",
    height: 50,
    marginLeft: -50,
    fontWeight: "bold",
  },
  headerAlt: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 25,
    marginTop: 5,
    width: "70%",
    height: 40,
    marginLeft: -90,
    fontWeight: "bold",
  },
  title: {
    flexDirection: "column",
    marginTop: 20,
  },
  titleAlt: {
    flexDirection: "column",
    marginTop: 20,
    width: "150%",
  },
});
