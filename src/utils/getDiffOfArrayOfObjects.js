// helps to find difference in array of objects
function getDiffOfArrayOfObjects(array1, array2) {
  return array1.filter((object1) => {
    return !array2.some((object2) => {
      return object1.id === object2.id;
    });
  });
}

export default getDiffOfArrayOfObjects;
