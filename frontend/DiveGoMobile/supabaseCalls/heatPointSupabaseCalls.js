import { supabase } from "../supabase";

export const heatPoints = async (GPSBubble, slider, animal) => {

  let minLat, maxLat, minLng, maxLng;

  if (GPSBubble.maxLat) {
    minLat = GPSBubble.minLat;
    maxLat = GPSBubble.maxLat;
    minLng = GPSBubble.minLng;
    maxLng = GPSBubble.maxLng;
  } else {
    minLat = GPSBubble.southWest.latitude;
    maxLat = GPSBubble.northEast.latitude;
    minLng = GPSBubble.southWest.longitude;
    maxLng = GPSBubble.northEast.longitude;
  }

  let animalVal
  if (animal === "All"){
    animalVal = ""
  } else {
    animalVal = animal
  }

  const { data, error } = await supabase
    .from("heatPoints")
    .select()
    .ilike("animal", "%" + animalVal + "%")
    .eq("month", slider)
    .gte("lat", minLat)
    .gte("lng", minLng)
    .lte("lat", maxLat)
    .lte("lng", maxLng)

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
  }

export const getLoneHeatPoint = async (values) => {
  const { data, error } = await supabase
    .from("heatPoints")
    .select()
    .eq("animal", values.animal)
    .eq("month", values.month)
    .gte("lat", values.minLat)
    .gte("lng", values.minLng)
    .lte("lat", values.maxLat)
    .lte("lng", values.maxLng)
    .limit(1)

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const insertHeatPoint = async (values) => {
  const { data, error } = await supabase.from("heatPoints").insert([
    {
      animal: values.animal,
      month: values.month,
      lat: values.lat,
      lng: values.lng,
      weight: 1,
    },
  ]);

  if (error) {
    console.log("couldn't do it,", error);
  }

  if (data) {
    console.log(data);
  }
};

export const updateHeatPoint = async (values) => {

  let newWeight = values.weight + 1

  const { data, error } = await supabase
    .from("heatPoints")
    .update({ weight: newWeight })
    .eq("id", values.id);

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const multiHeatPoints = async (GPSBubble, slider, animalArray) => {

  let minLat, maxLat, minLng, maxLng;

  if (GPSBubble.maxLat) {
    minLat = GPSBubble.minLat;
    maxLat = GPSBubble.maxLat;
    minLng = GPSBubble.minLng;
    maxLng = GPSBubble.maxLng;
  } else {
    minLat = GPSBubble.southWest.latitude;
    maxLat = GPSBubble.northEast.latitude;
    minLng = GPSBubble.southWest.longitude;
    maxLng = GPSBubble.northEast.longitude;
  }

  let creatureList 
  animalArray.forEach(creature => {
 
    if (creatureList === undefined){
      creatureList =  creature + ","
    } else{
      creatureList = creatureList + creature + ","

  }
    
  });

  let creatureListFinal

  if(creatureList !== undefined){
    creatureListFinal = creatureList.slice(0,-1)
 
  }
  
  const { data, error } = await supabase
    .from("heatPoints")
    .select()
    .filter('animal', 'in', '(' + creatureListFinal + ')')
    .eq("month", slider)
    .gte("lat", minLat)
    .gte("lng", minLng)
    .lte("lat", maxLat)
    .lte("lng", maxLng)

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
  }