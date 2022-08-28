export default function filterCreatures(array, value) {
    let newArr = [];

    array && array.forEach((animal) => {
        newArr.push({id: animal.id.toString(), title: animal.label});
    });

    console.log(value)
    if (value === "" || value === undefined || value === "Animal"){
        newArr.push({id: '0', title: "Animal"});
    } else {
        newArr.push({id: '0', title: value});
    }
    console.log(newArr)
    return newArr;
  }
