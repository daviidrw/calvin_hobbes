const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const url = 'http://www.gocomics.com/calvinandhobbesespanol'

request(url, function (error, response, body) {
  if (!err && response.statusCode==200){
    let $ = cheerio.load(body)
    let img_url = $('picture.img-fluid').children().attr('src')
    // download the img
    request(img_url).pipe(fs.createWriteStream('../images/1.jpg'))
  }
  });