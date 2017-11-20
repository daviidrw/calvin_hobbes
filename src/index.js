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
          console.log(res.request.uri)
          let $ = res.$;
          let img_url = $('picture.img-fluid').children().attr('src')
          console.log(img_url)
          let img_name  = img_url.split('/')
          request(img_url).pipe(fs.createWriteStream(`../images/${img_name[img_name.length-1]}.jpg`))
      }
      done()
  }
});
c.queue(urls)

