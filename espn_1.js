//Highest Wicket Taker of wining team
import request from "request";
import Cheerio from "cheerio";
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
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
    let arr=$(".ci-team-score.ds-flex.ds-justify-between.ds-items-center.ds-text-typo.ds-mb-2"); //wining team has only class team and losing has class = ds-opacity-50
    //the yellow block inside content comes in the variable, if more than one match comes in foem of array in variable

    //$ is The selector method is the starting point for traversing and manipulating the document
    //thats why we select block of teams here which also contain name and all stuffs
    let winningTeamNameElem="";
    for(let i=0;i<arr.length;i++) 
    {
        //hasClass() gives true if class is present in the selected yellow content else false
        //Check to see if any of the matched elements have the given className. it only checks in matched yellow 
        //content not inside the selected content
         let hasClass = $(arr[i]).hasClass("ds-opacity-50"); //losing class
         if(hasClass == false)
         {
             //to search inside element we use find() <<<<<<-------
             //Get the descendants of each element in the current set of matched elements, filtered by a selector
             //thats why we select block of both teams so that it contains all stuff like name and all not a just wining logo
             winningTeamNameElem = $(arr[i]).find(".ds-text-tight-l");  //the content inside .ds-text-tight-l class comes in the variable
             console.log(winningTeamNameElem.text()); //text inside winningTeamNameElem print it
         }
    }

    //extracting a part of page 
        let inningsArr=$(".ds-rounded-lg.ds-mt-2"); //2 matching yellow comes which will come in array
        // console.log(inningsArr.length);
        //content comes in string format which looks like hmtl
        let htmlstr="";
        for(let i=0;i<inningsArr.length;i++)
        {
        //    let chtml = $(inningsArr[i]).html();//when page content is big we extract its html and make it on new browser page(by go live) by psting it innew .html file
        //    and find content which makes easy to find classes in easier and sorted way
        //    htmlstr+=chtml;
        //    console.log(htmlstr);

           //team names
           let teamNameElements = $(inningsArr[i]).find(".header-title.label");
           let tnm = teamNameElements.text();
           // console.log(tnm); split tnm on basis of innings written  in output
           tnm=tnm.split("INNINGS")[0];
           tnm=tnm.trim();
           console.log(tnm);
           let hwtName = "";
           let hwt=0;
           if(winningTeamNameElem.text() == tnm)  //means we will find bowling table of the winning team inside if
           {
               console.log("-------------");
                let tableEle = $(inningsArr[i]).find(".table.bowler");
                //now table of winning team bowlers is extracted in tableEle 
                //now we will try to get name and wickets of all players
                let allBowlers = $(tableEle).find("tr"); //$(tableEle) means going inside tableEle
                for(let j=0;j<allBowlers.length;j++)
                {
                    let validNotCSS = $(allBowlers[j]).hasClass(".p-0.border-0.d-none"); 
                    if(validNotCSS == false)
                    {
                        let allCols = $(allBowlers[j]).find("td");
                        //td[0] has name and td[4] has wickets (check by html selection option)
                        let Pnm = $(allCols[0]).text();
                        let Pwkt = $(allCols[4]).text();
                        //finding highest wicket taker of all
                        if(Pwkt >= hwt)
                        {
                             hwt=Pwkt;
                             hwtName=Pnm;
                        }
                    }
                }
                console.log(`Winning Team -> ${winningTeamNameElem.text()} 
                Highest Wkt Taker of winning team -> ${hwtName} 
                Wickets Taken -> ${hwt}`);
           }

        }
        // console.log(htmlstr);
    
}

