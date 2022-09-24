import axios from "axios";

let IPSetter = 3
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

export const getAnimalNames = () => {

  return axios
    .post(`http://${IP}:5000/api/photoLabelsMobile`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

  export const insertphoto = (values) => {

    return axios
      .post(`http://${IP}:5000/api/photoAdd`, {
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
      .post(`http://${IP}:5000/api/photoLabelsThatFit`, {content: value})
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };
 
    