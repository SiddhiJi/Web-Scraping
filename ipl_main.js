//HomePage  ->  ViewAllMatches  ->  all url's of Matches  ->  Details   -> (make ipl folder if not then make teams folder if not)---<<--- n times
//Give details of ipl matches and players of 2020-21
//we've initially 3 page -> home page -> all matches -> [[particular match page(scrape details) -> put in folder's players's excel]]->>loop
const request=require("request");
const Cheerio=require("cheerio");
let fs = require("fs");
const path = require("path");
//to require different class from another class
const gamobj = require("./ipl_all_match.js"); //getAllMatchObj as it get all matches links
//its hard to select useful content in lot of html so we use cheerio module which reads from this html by using css selector syntax using 
//methods like .find()  .text()   .html()   .load()  etc....
const iplPath = path.join(__dirname,"ipl"); //__dirname gives path where these files are stored
dirCreator(iplPath);
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";  //homepage url
console.log("before");
request(url, cb);
console.log("after");
function cb(err,response,html)
{
     if(err)
     console.log(err);
     else{
         extractLink1(html);
     }
}
function extractLink1(html)
{
    let $ = Cheerio.load(html);   //reads all html and provide functionalities using $
    let linkAll = $(".widget-items.cta-link>a").attr("href");
    let linkAllFull = "https://www.espncricinfo.com"+linkAll;
    console.log(linkAllFull);
    gamobj.gam(linkAllFull);   
}

function dirCreator(filePath)
{
    if(fs.existsSync(filePath)==false) //Returns true if the path exists, false otherwise.
    fs.mkdirSync(filePath);
}