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

  export const uploadphoto = () => {

    return axios
      .post(`http://${IP}:5000/api/upload`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

  export const getPhotoFileName = () => {

    return axios
      .get(`http://${IP}:5000/api/upload`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

  export const removePhoto = (values) => {

    return axios
      .post(`http://${IP}:5000/api/upload/delete`, {
        path: values.filePath,
        fileName: values.fileName,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };