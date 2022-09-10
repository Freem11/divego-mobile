import axios from "axios";

export const getAnimalNames = () => {

  return axios
    .post("http://10.0.0.68:5000/api/photoLabelsMobile")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

  export const insertphoto = (values) => {

    return axios
      .post("http://10.0.0.68:5000/api/photoAdd", {
        File: values.photofile,
        Animal: values.label,
        Date: values.datetaken,
        Lat: values.latitude,
        Lng: values.longitude,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

  export const getAnimalNamesThatFit = (value) => {

    return axios
      .post("http://10.0.0.68:5000/api/photoLabelsThatFit", {content: value})
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };
 
    