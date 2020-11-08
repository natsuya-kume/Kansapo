export const snapshotToArray = (snapshot) => {
  let returnArr = [];

  snapshot.forEach((childSnapshot) => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item.name);
  });
  return returnArr;
};
