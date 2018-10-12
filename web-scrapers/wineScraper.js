const Nightmare = require('nightmare');
const nightmare = Nightmare({ show:true });
const vo = require('vo');
const { writeFile } = require('fs');

const regionUrls = require('./regionUrls');

function* grabVineyardLinks () {
  let links = [];

  for (let i=0; i<regionUrls.length; i++) {
    yield nightmare
      .goto(regionUrls[i])
      .wait('.checklist-number')
      .evaluate(() => {
        const topVineyardDivs = document.querySelectorAll('.checklist-number')[0];
        const tables = [...topVineyardDivs.querySelectorAll('table')];
        const vineyardLinks = tables.map(table => table.querySelector('td').querySelector('a').href)
        return vineyardLinks;
      })
      .then(vineyards => {
        links.push(...vineyards)
      })
      .catch(console.log)
  }
  writeFile('vineyardUrls.json', JSON.stringify(links, null, 2), function(err) {
    if(err) console.log('nah,', error);
  })
  return links;
}

const grabVineyards = function* () {
  const regions = [];

  for (let i=0; i<regionUrls.length; i++) {
    let links = [];

    let vineyards = yield nightmare
      .goto(regionUrls[i])
      .wait('body')
      .evaluate(() => {
        const topWinesDiv = document.querySelector('.checklist-number');
        return [...topWinesDiv.querySelectorAll('a')].map(tag => tag.href);
      })
      .then(links => {
        return links.map(link => {
          let vineyard = {};
    
          nightmare
            .goto(link)
            .wait('body')
            .evaluate(() => {
              const name = document.querySelector('h3').innerText;
              const address = document.querySelector('.dataContent')[1];
              const location = address.querySelector('span').innerText;
              // const date_established = document.querySelector('h3').innerText;
              const wineData = document.querySelector('.dataTable')
              const vinyardWines = [...wineData.querySelectorAll('tr')];
              // generate wine objects
              let wines = [];
              for (let i=1; i<vinyardWines.length; i++) {
                let w = {};
                let wineStats = [...vinyardWines[i].querySelectorAll('td')];
                // create wine object
                w.name = wineStats[1].innerText || 'N/A';
                w.price = wineStats[2].innerText  || 'N/A';
                w.score = wineStats[3].innerText || 0;
                // push wine to wines array
                wines.push(w);
              }
              // create vineyard object
              return { wines, name, location };
            })
        })
      })
      .then(vineyards => regions.push(vineyards));
  }
  // return regions;
  console.log(regions)
  nightmare.end()
  return regions;
}

vo(grabVineyardLinks)(function(err, regions){
  console.log(regions);
});

// const getAddress = async id => {
//   console.log(`Checking ${id}`);
//   const nightmare = new Nightmare({ show:true });

//   try {
//     await nightmare
//       .goto(START)
//       .wait('.dataTable')
//       .click('')
//   } catch(error) {
//     console.log(error)
//   }
// }

// nightmare
//   .goto(START)
//   .wait(500)
//   // click on vineyard URL
//   .click(':nth-child(8) > .hkey > a')
//   .wait(1000)
//   // grab vineyard data -> insert to object
//   // if no wines -> insert empty array to vineyard object
//   // if wines, click on link and grab wine data -> insert to object
//   // push wine object to wines array
//   // repeat if necessary
//   // insert wines array to vineyard object
//   // goBack to vineyard list
//   // REPEAT WITH NEXT VINEYARD
//   .evaluate(() => {
//     const title = document.querySelector('.category-title');
//     if (title.includes('404')) {

//     }
//   })
//   // .evaluate(() => document.querySelectorAll('.hkey'))
//   .end()
//   .then(result => {
//     // fs.writeFile('vinyard.json', JSON.stringify(result, null, 2), function(err) {
//     //   if(err) {
//     //     console.log('nah,', error)
//     //   }
//     // })
//     console.log(result)
//   })
//   .catch(error => console.error('Search failed: ', error))



// .evaluate(() => {
//   let vinyards = [];
//   // grab array of vineyard links
//   const topWinesDiv = document.querySelector('.checklist-number');
//   const tags = [...topWinesDiv.querySelectorAll('a')];
//   const links = tags.map(tag => tag.href);
//   // goto each
//   links.forEach(link => {
//     let vineyard = {};
//     // return vineyard data, with wine array
//     yield nightmare
//       .goto(link)
//       .wait('body')
//       .evaluate(() => {
//         const name = document.querySelector('h3').innerText;
//         const address = document.querySelector('.dataContent')[1];
//         const location = address.querySelector('span').innerText;
//         // const date_established = document.querySelector('h3').innerText;
//         const wineData = document.querySelector('.dataTable')
//         const wines = [...wineData.querySelectorAll('tr')];
//         let vinyardWines = [];
//         for (let i=1; i<wines.length; i++) {
//           let w = {};
//           let wineStats = [...wines[i].querySelectorAll('td')];
//           // create wine object
//           w.name = wineStats[1].innerText || 'N/A';
//           w.price = wineStats[2].innerText  || 'N/A';
//           w.score = wineStats[3].innerText || 0;
//           // push wine to wines array in vineyard
//           vinyardWines.push(w);
//         }
//         return vineyardWines;
//       })
//       .then(wines => vineyard.wines = wines)
//       .catch(error => console.log(error))
//     // add to vineyards array
//     vinyards.push(vinyard);
//   })
//   return vinyards;
// })
// // push array to regions
// .then(vinyards => regions.push(vinyards))
// .catch(error => console.log(error))
// }