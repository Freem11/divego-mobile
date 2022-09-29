import { supabase } from "../supabase";

export const getAnimalNames = async () => {

  const { data, error } = await supabase
  .from("photos")
  .select("label")

if (error) {
  console.log("couldn't do it,", error);
  return [];
}

if (data) {
  return data;
}
};

  export const insertphoto = async (values, monthID) => {

    const { data, error } = await supabase
    .from("photos")
    .insert([
      {
        photoFile: values.photoFile,
        label: values.label,
        dateTaken: values.dateTaken,
        latitude: values.latitude,
        longitude: values.longitude,
        month: monthID
      },
    ]);

  if (error) {
    console.log("couldn't do it,", error);
  }

  if (data) {
    console.log(data);
  }
  };

  export const getAnimalNamesThatFit = async (value) => {

  const { data, error } = await supabase
  .from("photos")
  .select("label")
  .ilike("label", "%" + value + "%")

if (error) {
  console.log("couldn't do it,", error);
  return [];
}

if (data) {
  return data;
}
};
 

  export const getPhotosforAnchor = async (value) => {

    const { data, error } = await supabase
    .from("photos")
    .select()
    .eq("month", value.sliderVal)
    .gte("latitude", value.minLat)
    .gte("longitude", value.minLng)
    .lte("latitude", value.maxLat)
    .lte("longitude", value.maxLng)

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
  }; 
    