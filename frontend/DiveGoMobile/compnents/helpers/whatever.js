import * as Location from "expo-location";
let foregroundSubscription = null;

let longitude1 = 0;
let latitude1 = 0;


async function CurrentCoords () {
    const requestPermissions = async () => {
      try {
        const forground = await Location.requestForegroundPermissionsAsync();
        if (forground.granted)
          await Location.requestBackgroundPermissionsAsync();
      } catch (e) {
        console.log({ title: "Error", message: e.message });
      }
    };
   requestPermissions();

    const { granted } = await Location.getForegroundPermissionsAsync();

    if (!granted) {
      console.log("location tracking denied");
      setRegion({ ...region,})
    }
    foregroundSubscription?.remove();

     try {
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
        },
        (location) => {  
          // console.log(location)
            
            longitude1 = location.coords.longitude
            latitude1 = location.coords.latitude            
        }
      );
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  }

  export {CurrentCoords};