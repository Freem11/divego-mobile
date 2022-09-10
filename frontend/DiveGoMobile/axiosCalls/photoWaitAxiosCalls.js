import axios from "axios";

export const photoWaits = () => {

  return axios
    .post("http://10.0.0.68:5000/api/photoWait")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const insertPhotoWaits = (values) => {

  return axios
    .post("http://10.0.0.68:5000/api/photoWaitAdd", {
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
    .get(`http://10.0.0.68:5000/api/photoWait/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deletePhotoWait = (id) => {

  return axios
    .delete(`http://10.0.0.68:5000/api/photoWait/delete/${id}`, {id})
    .then((response) => {
    })
    .catch((err) => {
      return err;
    });
  }
