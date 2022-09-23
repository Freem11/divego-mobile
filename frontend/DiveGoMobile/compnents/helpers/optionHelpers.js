export default function filterCreatures(array) {
  let newArr = [];
  let count = 1
  array &&
    array.forEach((animal) => {
      if (animal.id !== 0) {
        newArr.push({ id: count, title: animal.label });
      }
      count++
    });

  // if (value === "" || value === undefined || value === "Animal") {
  //   newArr.push({ id: "0", title: "Animal" });
  // } else {
  //   newArr.push({ id: "0", title: value });
  // }
  return newArr;
}
