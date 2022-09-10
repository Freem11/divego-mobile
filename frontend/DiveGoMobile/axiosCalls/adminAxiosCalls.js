import axios from "axios";

export const adminCheck = (pass) => {

      return axios
        .post("http://10.0.0.68:5000/api/session", { pass: pass })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
          return err;
        });
    }