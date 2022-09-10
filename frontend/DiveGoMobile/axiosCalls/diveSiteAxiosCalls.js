import axios from "axios";

 export const diveSites = (GPSBubble) => {

    return axios
      .post("http://10.0.0.68:5000/api/diveSites", { GPSBubble: GPSBubble })
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  export const insertDiveSite = (values) => {

    return axios
      .post("http://10.0.0.68:5000/api/diveSiteAdd", {
        Name: values.name,
        Lat: values.lat,
        Lng: values.lng,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };