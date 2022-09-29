import axios from "axios";

let IPSetter = 2
let IP
//Desktop = 10.0.0.253
//Laptop = 10.0.0.68

if (IPSetter === 1) {
  IP = '10.0.0.253'
} else if (IPSetter === 2){
  IP = '10.0.0.68'
}

export const adminCheck = (pass) => {

      return axios
        .post(`http://${IP}:5000/api/session`, { pass: pass })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
          return err;
        });
    }