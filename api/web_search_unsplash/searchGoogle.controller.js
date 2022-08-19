const jsdom = require('jsdom')
const dom = new jsdom.JSDOM("")
const jquery = require('jquery')(dom.window)
const puppeteer = require('puppeteer');

const {
  create,
  getStickerByuser_id, 
} = require("./searchGoogle.service");


const searchGoogle = async (searchQuery) => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ignoreHTTPSErrors: true,
    headless: false,
    devtools: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
    // args: ['--no-sandbox', '--disable-setuid-sandbox', '--proxy-server=128.199.154.45:8080']
  });
  var page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
      req.abort();
    }
    else {
      req.continue();
    }
  });
  await page.goto('https://unsplash.com/t/'+searchQuery);
  await page.waitForTimeout(2000);
  await page.evaluate(scrollToBottom);
  async function scrollToBottom() {
    let finishTime = new Date().getTime() + (0 * 60 * 1000);
    await new Promise(resolve => {
      const distance = 100; 
      const delay = 50;
      const timer = setInterval(() => {
        document.scrollingElement.scrollBy(0, distance);
        if (document.scrollingElement.scrollTop + window.innerHeight >= document.scrollingElement.scrollHeight || new Date().getTime() > finishTime) {
          clearInterval(timer);
          resolve();
        }
      }, delay);
    });
  }
  
  console.log("start");
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var url = require('url');
  var https = require('https');
  var sizeOf = require('image-size');
  
  let datafromimagesize=[];
  async function myFunc (splitimgcontent) { 
    var options = url.parse(splitimgcontent);
    queryPromise1 = () =>{
      return new Promise((resolve, reject)=>{
        var res=https.get(options, function (response) {
          var chunks = [];
          response.on('data', function (chunk) {
            chunks.push(chunk);
          }).on('end', function() {
            var buffer = Buffer.concat(chunks);
            var dimensions=sizeOf(buffer)
            json=JSON.parse(JSON.stringify(dimensions))
            return resolve(json);
          });
        });
      });
    }
    var dimensionarr = await queryPromise1();
    delete dimensionarr.type;
    dimensionarr.wallpaper_height=dimensionarr.height;
    dimensionarr.wallpaper_width=dimensionarr.width;
    const ufs = require("url-file-size");
    let size= await ufs(splitimgcontent)
    dimensionarr.wallpaper_size=(size/(1024*1024)).toFixed(2)+' Mb'
    datafromimagesize.push(dimensionarr);
    return dimensionarr;
  }
  await page.exposeFunction("myFunc", myFunc);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  page.on('console', msg => console.log(msg.text()));
  let searchResults = await page.evaluate (async() => {
    scrapeItems = [];
    let alldivs =  document.body.querySelectorAll('div.ripi6');
    alldivs.forEach (item => {
      let inside_alldivs = item.querySelectorAll('figure');
      inside_alldivs.forEach ( figs=> {
        var nextpagelink = figs.querySelector('a.rEAWd').href
        var title = figs.querySelector('a.rEAWd').title
        var pic = figs.querySelector('img.YVj9w').srcset.replace(" 2592w","").split('2400w, ');
        var splitimgcontent = pic[1];
        if(!splitimgcontent){
          var pic = figs.querySelector('img.YVj9w').srcset.split('1800w, ').join(', ').split('2000w, ').join(', ').split('2200w, ');
          var splitimgcontent = pic[1];
          if(!splitimgcontent){
            var pic = figs.querySelector('img.YVj9w').srcset.split('1800w, ').join(', ').split('2000w, ');
            var splitimgcontent = pic[1];
            if(!splitimgcontent){
              var pic = figs.querySelector('img.YVj9w').srcset.split('1800w, ');
              var splitimgcontent = pic[1];
            }
          } 
        }
        
        var res= findsize();
        async function findsize () {
          dimensionarrresult= await window.myFunc(splitimgcontent);
          // console.log("tt",dimensionarrresult.width);
        }
        // return
        
        var thumbnaillink = figs.querySelector('img.YVj9w').srcset.split('200w, ');
        thumbnaillink = thumbnaillink[0].split('100w, ')
        thumbnail_path=thumbnaillink[1];
        var author = figs.querySelector('a.ZNlY9').href;
        var authorname = figs.querySelector('a.N2odk').innerHTML;
        var downloadlink = figs.querySelector('a.CyIN2').href;
        var thumbimg = figs.querySelector('img.YVj9w');
        var thumbimgwidth = thumbimg.clientWidth;
        var thumbimgheight = thumbimg.clientHeight;
        var wallpaper_link = figs.querySelector('a.CyIN2').href.replace("&force=true","");
        var invalid=document.querySelector("img.aaaaaa") ? document.querySelector("img.aaaa").innerText : false;
        scrapeItems.push ({
          title:title,
          description:"descriptionfromnextp",
          thumbnail_path:thumbnail_path,
          thumbnail_width:`${thumbimgwidth}`,
          thumbnail_height:`${thumbimgheight}`,
          pic:splitimgcontent,
          wallpaper_width:"widthfrommodule",
          wallpaper_height:"heightfrommodule",
          author:authorname,
          wallpaper_size:"sizefrommodule",
          views:"viewsfromnextp",
          downloads:"downloadsfromnextp",
          invalid:invalid,
          downloadlink:downloadlink,
          authorlink:author,
          nextpagelink:nextpagelink,
        }
        );
      });
    });
    return scrapeItems;
  });
  // console.log("firstpage",searchResults);
  // return
  
  /////for next page scraping
  let nextpagelinks=[]
  searchResults.forEach(function (searchResult) {
    nextpagelinks.push(searchResult.nextpagelink)
  });
  // console.log("nextpagelinks",nextpagelinks);
  let datafromnextpage=[]
  for(let link of nextpagelinks){
    const newPage = await browser.newPage();
    await newPage.setViewport({ width: 1920, height: 1080 });
    await newPage.setRequestInterception(true);
    newPage.on('request', (req) => {
      if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
        req.abort();
      }
      else {
        req.continue();
      }
    });
    await newPage.goto(link);
    // const request = require('request-promise');
    // let loginRequest = await request({uri:'http://quotes.toscrape.com/login'});
    // console.log("ddd",loginRequest);
    const searchResultsnextpage = await newPage.evaluate(() => {
      const views = document.querySelector('span.Jz2zu').innerText;
      const downloads = document.querySelector('div.bck87 >:nth-child(2)>span.Jz2zu').innerText;
      const description = document.querySelector('meta[name=description]').content;
      return (searchdata = {
        views,
        downloads,
        description
      });
    });
    datafromnextpage.push(searchResultsnextpage)
    await newPage.close()
  }
  // console.log("firstpage",searchResults);
  // console.log("nextpage",datafromnextpage);
  
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // let datafromimagesize=[];
  // for (let link of searchResults){
  //   var url = require('url');
  //   var https = require('https');
  //   var sizeOf = require('image-size');
  //   // var imgUrl = 'https://unsplash.com/photos/BuipJzwKJ4w';
  //   var options = url.parse(link.pic);
  //   queryPromise1 = () =>{
  //     return new Promise((resolve, reject)=>{
  //       var res=https.get(options, function (response) {
  //         var chunks = [];
  //         response.on('data', function (chunk) {
  //           chunks.push(chunk);
  //         }).on('end', function() {
  //           var buffer = Buffer.concat(chunks);
  //           dimensions=sizeOf(buffer)
  //           // datafromimagesize.push(dimensions)  //not work
  //           return resolve(dimensions);
  //         });
  //       });
  //     });
  //   }
  //   const dimensionarr = await queryPromise1();
  //   delete dimensionarr.type;
  //   dimensionarr.wallpaper_height=dimensionarr.height;
  //   dimensionarr.wallpaper_width=dimensionarr.width;
  //   const ufs = require("url-file-size");
  //   let size= await ufs(link.pic)
  //   dimensionarr.wallpaper_size=(size/(1024*1024)).toFixed(2)+' Mb'
  //   datafromimagesize.push(dimensionarr); //work
  // }
  console.log("pppsss",datafromimagesize);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let finalresult = searchResults.map((item, i) => Object.assign({}, item, datafromnextpage[i],datafromimagesize[i])); 
  console.log("finalresult", finalresult);
  await browser.close();
  return finalresult
};
module.exports = searchGoogle;
