//birthday of every batsman played i.e batted
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
    let arr=$(".match-info.match-info-MATCH.match-info-MATCH-half-width .team"); //wining team has only class team and losing has class = team-grey
    //the content inside ".  " class comes in the variable, if more than one match comes in foem of array in variable

    //$ is The selector method is the starting point for traversing and manipulating the document
    //thats why we select block of teams here which also contain name and all stuffs
        let inningsArr=$(".card.content-block.match-scorecard-table>.Collapsible");
        console.log(inningsArr.length);
        //content comes in string format which looks like hmtl
        let htmlstr="";
        for(let i=0;i<inningsArr.length;i++)
        {
           //let chtml = $(inningsArr[i]).html();//when page content is big we extract its html and make it on new browser page and find content which makes easy to find classes in easier and sorted way
           //htmlstr+=chtml;
           //team names
           let teamNameElements = $(inningsArr[i]).find(".header-title.label");
           let tnm = teamNameElements.text();
           // console.log(tnm); split tnm on basis of innings written  in output
           tnm=tnm.split("INNINGS")[0];
           tnm=tnm.trim();
           console.log(tnm);
                let tableEle = $(inningsArr[i]).find(".table.batsman");
                //now table of winning team bowlers is extracted in tableEle 
                //now we will try to get name and wickets of all players
                let allBatters = $(tableEle).find("tr"); //$(tableEle) means going inside tableEle to fing all tr tag and store in array
                for(let j=0;j<allBatters.length;j++)
                {
                    let allCols = $(allBatters[j]).find("td");
                    let validNotCSS = $(allCols[0]).hasClass("batsman-cell");  //elem having this class is only valid row
                    if(validNotCSS == true)
                    {
                        //td[0] has name and td[4] has wickets (check by html selection option)
                        let Pnm = $(allCols[0]).text();
                        //console.log(`Winning Team -> ${tnm}    Player bame-> ${Pnm}`);
                        //a tag contains link and all
                        //so we will go inside td[0] by $ an inside a tag and link will be there in href
                        let link = $(allCols[0]).find("a").attr("href");  //takes out attribute link in link
                        let fullLink = "https://www.espncricinfo.com/"+link;
                        //console.log(fullLink);
                        getBithdayPage(fullLink,Pnm,tnm); // player_name , team_name
                    }
                }
           }

}
function getBithdayPage(url,Pnm,tnm)
{
    request(url, cb);
    function cb(err, response, html)
    {
        if(err)
        {
console.log("some error");
        }
        else{
            extractBirthday(html,Pnm,tnm);
        }
    }
}
function extractBirthday(html,Pnm,tnm)
{
    let $ = Cheerio.load(html);
    let playerDetails = $(".player-card-description.gray-900");
    let birthDate = $(playerDetails[1]).text(); //2nd index xontains birthday
    console.log(Pnm,tnm,birthDate);
}
        // console.log(htmlstr);
    

