//cheerio comes in picture to find content inside the big html files which comes when request is made
//cheerio is web scraping lib.
import request from 'request';
import cheerio from 'cheerio';
import chal from 'chalk';
console.log("Before");
request('https://www.worldometers.info/coronavirus/', cb);//request is sent and cb function will be called when response is given by server
console.log("After");

function cb(error, response, html) 
{
    if(error)
    console.error('error:', error);
    else
    // console.log('html:', html); 
    handlehtml(html);
}
function handlehtml(html)
{
    let seltool=cheerio.load(html); //brings html in its form, whew you can normally scrape by passing selectors
    let h1s=seltool("h1"); //gives array of h1's
    let arr=seltool(".news_li");
    //[i]->wrap seltool
    let data=seltool(arr[0]).text();
    console.log(data);
    for(let i=0;i<arr.length;i++)
    {
        let data=seltool(arr[i]).text();
        if(i==0)
        console.log(chal.blue.bold.bgGray("Total Cases:"+data))
        if(i==1)
        console.log(chal.blue.bold.bgRed("Deaths:"+data));
        if(i==2)
        console.log(chal.black.bgGreen("Recovered"+data));
    }
    console.log(h1s.length);
}
