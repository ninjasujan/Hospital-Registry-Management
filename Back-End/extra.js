const jsObject = [
  { name: "Sujan", age: 21, marks: [1, 2, 3] },
  { name: "Max", age: 25, marks: [1, 3, 6] },
];

const jsonObject = JSON.stringify(jsObject);

// console.log(jsonObject);

for (let object of JSON.parse(jsonObject)) {
  console.log(object);
}

// db.prescriptions
//   .find({ medicineList: { $elemMatch: { "timings.1": 1 } } })
//   .pretty();

// db.prescriptions
//   .find({ date: { $lte: ISODate(new Date().toISOString()) } })
//   .pretty();
