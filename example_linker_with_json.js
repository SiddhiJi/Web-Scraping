/*  1st way-:
let fs = require("fs");
let buffer = fs.readFileSync("./example.json");//path if stored anywhere else
console.log(buffer);
console.log("''''''''''''''''''''''''");
let data = JSON.parse(buffer); // it converts buffer(binary) to JSON format and shows data inside file
console.log(data);
*/
//2nd way-:
let data=require("./example.json");
console.log(data);
//to add data in file
data.push({
    "name":"Thor",
    "last name":"Natasha",
    "isAvenger":"false",
    "friends":["peter","harry"],
    "age":45,
    "address":{
        "house no.":"56 B",
        "street":"Budhapest",
        "city":"manhattan"
    }
   });

let stringData = JSON.stringify(data);
   //as writefileSync does not write in json
fs.writeFileSync("example.json",stringData);

