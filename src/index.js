const fs = require('fs')
const request = require('request')
const Crawler = require("crawler")
const url = 'http://www.gocomics.com/calvinandhobbesespanol'

const year = process.env.YEAR || 2017
const month = process.env.MONTH || 11

let urls = []

function getUrls(){
  for(i=1;i<31;i++){
    urls.push(`${url}/${year}/${month}/${i}`)
  }
}
getUrls()

const c = new Crawler({
  maxConnections : 10,
  // This will be called for each crawled page
  callback : (error, res, done) => {
      if(error){
          console.log('ERROR')
          console.log(error)
      }else{
          let $ = res.$;
          let img_url = $('picture.img-fluid').children().attr('src')
          console.log(img_url)
          //request(img_url).pipe(fs.createWriteStream(__dirname + `/images/${img_url}.jpg`))
      }
      done()
  }
});
c.queue(urls)

