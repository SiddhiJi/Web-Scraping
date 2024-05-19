let fs = require("fs");
let data=require("./example.json");
//module named xlsx is used to create, update,  read and write data from excel format
let xlsx = require("xlsx");
//EXCEL/docs/pdf -> file(workbook) -> sheets -> columns -> rows

//wb -> filePath , worksheet name , json data
function excelWrite(filePath,json,sheetname)
{
//write in excel
//new workbook
let newWB = xlsx.utils.book_new();
//json data convert to excel format
let newWS = xlsx.utils.json_to_sheet(json);
//adding ws to wb -> (wb, ws, sheet name)
xlsx.utils.book_append_sheet(newWB,newWS,sheetname);
//adds wb to our file system   -> wb, name
xlsx.writeFile(newWB,filePath);
}

function excelReader(filePath,sheetname)
{
    if(fs.existsSync(filePath) == false)
    return null;
//read from excel
//workbook get
let wb = xlsx.readFile(filePath);
//worksheet get
let excelData = wb.Sheets[sheetname];
//sheet data
let ans = xlsx.utils.sheet_to_json(excelData);
return ans;
}