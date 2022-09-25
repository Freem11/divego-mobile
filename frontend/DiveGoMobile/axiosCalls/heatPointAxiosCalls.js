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

export const heatPoints = (GPSBubble, slider, animal) => {

    return axios
      .post(`http://${IP}:5000/api/heatPoints`, { GPSBubble: GPSBubble, SliderValue: slider, AnimalValue: animal })
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

export const getLoneHeatPoint = (values) => {

  return axios
    .post(`http://${IP}:5000/api/heatPoint`, {
      Lat: values.lat,
      Lng: values.lng,
      Animal: values.animal,
      Month: values.month,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const grabHeatPointById = (id) => {

  return axios
    .get(`http://${IP}:5000/api/heatPoint/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const insertHeatPoint = (values) => {

  return axios
    .post(`http://${IP}:5000/api/HeatPointAdd`, {
      Lat: values.lat,
      Lng: values.lng,
      Animal: values.animal,
      Month: values.month,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateHeatPoint = (values) => {

  return axios
    .post(`http://${IP}:5000/api/HeatPointUpdate`, {
      Id: values.id,
      Weight: values.weight,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
