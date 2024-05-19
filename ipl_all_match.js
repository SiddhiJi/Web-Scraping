const request=require("request");
const Cheerio=require("cheerio");
const scobj = require("./ipl-help");//as this class gives scorecard details of every match link
function getAllMatchesLink(url)
{
    request(url, function(err,response,html){
        if(err)
        console.log(err);
        else{
           extractLink2(html);
        }
    })
}
function extractLink2(html)
{
    let $ = Cheerio.load(html);
    let scorecardElement = $("a[data-hover='Scorecard']");//this methods is also used to select block of link of content if datahover is given
    for(let i=0;i<scorecardElement.length;i++)
    {
        let link = $(scorecardElement[i]).attr("href"); //gives link of scorecard of match
        //compllete the half completed links by adding the link which is same for all pages
        let linkFull = "https://www.espncricinfo.com"+link;
        console.log(linkFull);    //print all links
        scobj.ps(linkFull);
    }
}
//to run this file from ipl.js
module.exports = {
    gam : getAllMatchesLink
}