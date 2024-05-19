const fs=require("fs");
console.log("Before");
// let data=fs.readFileSync("f1.txt");
// console.log(""+data);
//What if file is of 100MB then other processes have to wait 
//so long so environment gives several features to handle this
//Async function
fs.readFile("f1.txt",cb); //cb=call back(when file is read it gives call back)
function cb(err,data)
{
    if(err)
    console.log(err)
    else
    console.log("data "+data);
}
//by using this rest processes are done and in last f1.txt 
//file data is displayed
console.log("After");
console.log("Meanwhile");

