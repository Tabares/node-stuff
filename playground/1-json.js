const fs = require('fs');
// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
// }

// const bookJSON  = JSON.stringify(book);
// console.log(bookJSON);
// console.log(bookJSON.title); // is not an object is JSON
// const parseData = JSON.parse(bookJSON);
// console.log(parseData.title);
// fs.writeFileSync('1-json.json', bookJSON);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

// {
//     "name":"Andrew",
//     "planet":"Earth",
//     "age":27
// }

const dataBuffer = fs.readFileSync('2-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
console.log(data.name);
const myData = {...data, name: 'Emmanuel', age: '32'};
const myDataJSON = JSON.stringify(myData);
console.log(myDataJSON);
fs.writeFileSync('2-json.json', myDataJSON);
const d = JSON.parse(fs.readFileSync('2-json.json').toString());
console.log(d);