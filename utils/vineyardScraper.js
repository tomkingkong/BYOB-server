const Nightmare = require('nightmare');
const nightmare = Nightmare({ show:false });
const vo = require('vo');
const { writeFile } = require('fs');

const vineyardUrls = require('./data/vineyardUrls');

function* grabVineyards() {
  const vineyards = [];
  for (let i=0; i<vineyardUrls.length; i++) {    
    yield nightmare
      .goto(vineyardUrls[i])
      .wait('.dataTable')
      .evaluate(() => {
        const name = document.querySelector('h3').innerText || 'N/A';
        // const address = document.querySelector('.dataContent')[1]
        // let location = 'N/A';
        // if (address) {
        //   location = address.querySelector('span').innerText;
        // }
        let date_established = document.querySelectorAll('dd')[3]
          .querySelector('p').innerText || 'N/A';
        date_established = parseInt(date_established) || 'N/A';
        const wineData = document.querySelector('.dataTable') || [];
        const vinyardWines = [...wineData.querySelectorAll('tr')];
        // generate wine objects
        let wines = [];

        for (let j=1; j<vinyardWines.length; j++) {
          let wineStats = [...vinyardWines[j].querySelectorAll('td')];
          if (!wineStats) return
          // create wine object
          let name = wineStats[1].innerText || 'N/A';
          let price = wineStats[2].innerText  || 'N/A';
          let score = parseInt(wineStats[3].innerText) || 0;
          // push wine to wines array
          wines.push({ name, price, score });
        }

        // create vineyard object
        return { wines, name, date_established };
      })
      .then(vineyard => { 
        console.log(vineyard)
        vineyards.push(vineyard)
      })
      .catch(console.log)
  }
  nightmare.end()
  writeFile('vineyardData.json', JSON.stringify(vineyards, null, 2), function(err) {
    if(err) console.log('nah,', error);
  })
  return vineyards;
}

vo(grabVineyards)(function(err, vineyards){
  console.log(vineyards);
});