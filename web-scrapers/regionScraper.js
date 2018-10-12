const Nightmare = require('nightmare');
const nightmare = Nightmare({ show:true });
const vo = require('vo');
const { writeFile } = require('fs');

const START = 'http://www.everyvine.com/wine-regions/';

const grabRegionUrls = () => {
  nightmare
    .goto(START)
    .wait('body')
    .evaluate(() => {
      const wineTable = document.querySelector('.dataTable');
      const tags = [...wineTable.querySelectorAll('a')];
      return tags.map(tag => tag.href)
    })
    .then(tags => {
      writeFile('regionUrls.json', JSON.stringify(tags, null, 2), function(err) {
        if(err) console.log('nah,', error);
      })
    })
    .catch(error => console.error('Search failed: ', error));
}

module.exports = vo(grabRegionUrls)(function(err, regions){
  console.log(regions);
});