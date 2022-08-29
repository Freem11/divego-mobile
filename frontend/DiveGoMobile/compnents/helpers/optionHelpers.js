export default function filterCreatures(array, value) {
    let newArr = [];

    array && array.forEach((animal) => {
        if(animal.id !== 0){
        newArr.push({id: animal.id.toString(), title: animal.label});
    }
    });

    if (value === "" || value === undefined || value === "Animal"){
        newArr.push({id: '0', title: "Animal"});
    } else {
        newArr.push({id: '0', title: value});
    }
    return newArr;
  }
