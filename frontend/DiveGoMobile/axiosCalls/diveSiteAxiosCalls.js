import axios from "axios";

let IPSetter = 2
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

 export const diveSites = (GPSBubble) => {

    return axios
      .post(`http://${IP}:5000/api/diveSites`, { GPSBubble: GPSBubble })
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  export const insertDiveSite = (values) => {

    return axios
      .post(`http://${IP}:5000/api/diveSiteAdd`, {
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