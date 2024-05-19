//Given url of match yo have to tell last ball commentary
//cheerio model is used to read and manipulate html content. It can give text inside the selected content by .text() or html inisde it by .html()
//while in practice 10 questions we were using normal style tag which only selects the text inside the classes or selected content
//https://www.espncricinfo.com/series/afghanistan-v-netherlands-2021-22-1295180/afghanistan-vs-netherlands-1st-odi-1295181/ball-by-ball-commentary
import request from "request";
import cheerio from "cheerio";
const url = "https://www.espncricinfo.com/series/west-indies-in-india-2021-22-1278661/india-vs-west-indies-1st-odi-1278676/ball-by-ball-commentary";
console.log("Before");
request(url,cb);
console.log('after request');

function cb(err,response,html)
{
    if(err)
    console.log(err);
    else
    {
        handleHtml(html);
    }
}
function handleHtml(html)
{
    let ii = cheerio.load(html); //it gives tools through which by css selector syntax you can find element
    let arr=ii(".ds-text-typo-mid1 .ci-html-content");
    let text=ii(arr[0]).text();
    console.log(text);
    console.log(ii(arr[0]).html()); //this brings the html content of the seleted content below ii
    console.log(arr.length);
    //ii is The selector method is the starting point for traversing and ma
}


//Scorecard -> given link of scorecard page of the match. Tell wining team player taken max wicket
//https://www.espncricinfo.com/series/afghanistan-v-netherlands-2021-22-12afghanistan95180/-vs-netherlands-1st-odi-1295181/full-scorecard

//Print birthday of every batsman with their name