export default function filterCreatures(array) {
    let newArr = [];

    array && array.forEach((animal) => {
        newArr.push({id: animal.id, title: animal.label});
    });
    return newArr;
  }
