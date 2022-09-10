import axios from "axios";

export const diveSiteWaits = () => {

  return axios
    .post("http://10.0.0.68:5000/api/diveSiteWait")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const insertDiveSiteWaits = (values) => {

  return axios
    .post("http://10.0.0.68:5000/api/diveSiteWaitAdd", {
      Name: values.Site,
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

export const grabDiveSiteWaitById = (id) => {

  return axios
    .get(`http://10.0.0.68:5000/api/diveSiteWait/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteDiveSiteWait = (id) => {

  return axios
    .delete(`http://10.0.0.68:5000/api/diveSiteWait/delete/${id}`, {id})
    .then((response) => {
    })
    .catch((err) => {
      return err;
    });
  }
