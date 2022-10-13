function formatDate(dateTaken) {

  let slicedDate = dateTaken.substring(0, 10);
  let formattedDate = slicedDate.replace(":", "-");
  return formattedDate;
}

function createFile(dateTaken) {

    let fileName = dateTaken.substring(
        dateTaken.lastIndexOf("/") + 1,
        dateTaken.length
      );

      const fileToUpload = {
        uri: dateTaken,
        name: fileName,
        type: "image/jpg",
      };
      return fileToUpload
}
export { formatDate, createFile };
