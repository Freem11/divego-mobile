import axios from "axios";

let IPSetter = 1
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

export const diveSiteWaits = () => {

  return axios
    .post(`http://${IP}:5000/api/diveSiteWait`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const insertDiveSiteWaits = (values) => {

  return axios
    .post(`http://${IP}:5000/api/diveSiteWaitAdd`, {
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
    .get(`http://${IP}:5000/api/diveSiteWait/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteDiveSiteWait = (id) => {

  return axios
    .delete(`http://${IP}:5000/api/diveSiteWait/delete/${id}`, {id})
    .then((response) => {
    })
    .catch((err) => {
      return err;
    });
  }
