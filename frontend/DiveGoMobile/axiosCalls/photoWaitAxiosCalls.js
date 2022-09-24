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

export const photoWaits = () => {

  return axios
    .post(`http://${IP}:5000/api/photoWait`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const insertPhotoWaits = (values) => {

  return axios
    .post(`http://${IP}:5000/api/photoWaitAdd`, {
      File: values.PicFile,
      Animal: values.Animal,
      Date: values.PicDate,
      Lat: values.Latitude,
      Lng: values.Longitude,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const grabPhotoWaitById = (id) => {

  return axios
    .get(`http://${IP}:5000/api/photoWait/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deletePhotoWait = (id) => {

  return axios
    .delete(`http://${IP}:5000/api/photoWait/delete/${id}`, {id})
    .then((response) => {
    })
    .catch((err) => {
      return err;
    });
  }
