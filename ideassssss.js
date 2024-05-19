import request from "request";
import Cheerio from "cheerio";
const url="https://www.espncricinfo.com/series/india-in-south-africa-2021-22-1277060/south-africa-vs-india-3rd-odi-1277084/full-scorecard";
console.log("Before");
request(url,cb);
console.log('after request');

function cb(err,response,html)
{
    if(err)
    console.log(err);
    else
    {
        extract(html);
    }
}
function extract(html)
{
    let $=Cheerio.load(html);
    let arr=$(".match-info.match-info-MATCH.match-info-MATCH-half-width .team .name-link"); //wining team has only class team and losing has class = team-grey
    //the content inside ".  " class comes in the variable, if more than one match comes in foem of array in variable

    //$ is The selector method is the starting point for traversing and manipulating the document
    //thats why we select block of teams here which also contain name and all stuffs
    console.log($(arr).hasClass("name-link"));
}