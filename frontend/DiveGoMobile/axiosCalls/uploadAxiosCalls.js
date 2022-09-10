import axios from "axios";

  export const uploadphoto = () => {

    return axios
      .post("http://10.0.0.68:5000/api/upload")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

  export const getPhotoFileName = () => {

    return axios
      .get("http://10.0.0.68:5000/api/upload")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

  export const removePhoto = (values) => {

    return axios
      .post("http://10.0.0.68:5000/api/upload/delete", {
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