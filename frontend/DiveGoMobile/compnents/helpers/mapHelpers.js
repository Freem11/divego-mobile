
function filterSites(newParams, array) {

    let newArr = [];
    array.forEach((diveSite) => {
      if (
        diveSite.lat > newParams.southWest.latitude &&
        diveSite.lat < newParams.northEast.latitude &&
        diveSite.lng > newParams.southWest.longitude &&
        diveSite.lng < newParams.northEast.longitude
      ) {
        newArr.push(diveSite);
      }
    });
    return newArr;
  }

  function formatHeatVals(heatValues) {

    let newArr = [];
    heatValues.forEach((heatPoint) => {
      let newpt = {
        latitude: heatPoint.lat,
        longitude: heatPoint.lng,
        weight: heatPoint.weight,
      };
      newArr.push(newpt);
    });
    return newArr;
  }

  export { filterSites, formatHeatVals };