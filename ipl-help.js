const request=require("request");
const Cheerio=require("cheerio");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
//its hard to select useful content in lot of html so we use cheerio module which reads from this html by using css selector syntax using 
//methods like .find()  .text()   .html()   .load()  etc....
//gives details of scorecaerd venue etc., to the passes link in url in processScorecard from ipl-all-match class
function processScorecard(url)
{
    request(url, cb);
}

function cb(err,response,html)
{
     if(err)
     console.log(err);
     else{
         extractMatchDetail(html);
     }
}
function extractMatchDetail(html)
{
    let $ = Cheerio.load(html);
    //Venue Date Opponent Result Runs Balls Fours Sixers StrikeRate
    //ipl folder -> teamFolder -> player File details in the series

    //first find common things like -: venue date nd result
    let venue_date = $(".header-info .description").text();
    let vd = venue_date.split(",");
    let venue = vd[1].trim();
    let date = vd[2].trim();
    let result = $(".match-info.match-info-MATCH.match-info-MATCH-half-width .status-text").text();
    //console.log(venue, date, result);
    
    //segregation of innings content as its very big to analyze
    let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
    let htmlstr="";
    for(let i=0;i<innings.length;i++)
    {
       htmlstr+=$(innings[i]).html(); //to get both innings html
       //team and opponent
       let teamName = $(innings[i]).find(".header-title.label").text();
       teamName = teamName.split("INNINGS")[0].trim();
       let opponentIndex = i==0 ? 1:0;
       let opponentname = $(innings[opponentIndex]).find(".header-title.label").text();
       opponentname = opponentname.split("INNINGS")[0].trim();
       let oinning = $(innings[i]);
       let allrows = oinning.find(".table.batsman tbody tr");
       for(let j=0;j<allrows.length;j++)
       {
           let allcols = $(allrows[j]).find("td");
           let isworthy = $(allcols[0]).hasClass("batsman-cell");
           if(isworthy==true)
           {
               let plnm = $(allcols[0]).text().trim();
               let runs = $(allcols[2]).text().trim();
               let balls = $(allcols[3]).text().trim();
               let fours = $(allcols[5]).text().trim();
               let sixes = $(allcols[6]).text().trim();
               let sr = $(allcols[7]).text().trim();
               console.log(`${plnm} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
               processPlayer(teamName,plnm,opponentname,runs,balls,fours,sixes,sr,venue,date,result);
           }
       }
        
    }
    //console.log(htmlstr);//copy from terminal this part of html and segregate in another .html page
}
module.exports = {
    ps:processScorecard
}
function processPlayer(teamName,plnm,opponentname,runs,balls,fours,sixes,sr,venue,date,result)
{
    let teamPath = path.join(__dirname, "ipl", teamName);
    dirCreator(teamPath);
    let filePath = path.join(teamPath,plnm+".xlsx");
    let content = excelReader(filePath,plnm);//if empty it will give empty array
    let new_data = {
        "teamName":teamName,
        "playerName":plnm,
        "runs":runs,
        "balls":balls,
        fours,//shorthand way to write "fours":fours if both key and value are same
        sixes,sr,opponentname,
        venue,date,result
    }
    content.push(new_data);//adding data in array 
    excelWrite(filePath,content,plnm);//writing updated in excel fie
}
// Copied from otherclasses
function dirCreator(filePath)
{
    if(fs.existsSync(filePath)==false){ //Returns true if the path exists, false otherwise.
    fs.mkdirSync(filePath);
    }
}
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
    return [];
//read from excel
//workbook get
let wb = xlsx.readFile(filePath);
//worksheet get
let excelData = wb.Sheets[sheetname];
//sheet data
let ans = xlsx.utils.sheet_to_json(excelData);
return ans;
}