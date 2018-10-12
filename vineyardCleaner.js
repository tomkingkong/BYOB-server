const vineyardData = require('./vineyardData.json');
const { writeFile } = require('fs');

const cleaner = (vineyards) => {
  const cleanData = vineyards.map(vineyard => {
    let cleanWines = vineyard.wines.map(wine => {
      const whites = ['Chardonnay', 'blanc', 'Semillon', 'Moscato', 'Grigio', 'Gris', 'Gewurztraminer', 'Riesling'];
      const reds = ['Noir', 'Malbec', 'Merlot', 'Syrah', 'Shiraz'];
      let name = wine.name.split(' ');
      let date = name[name.length-1].split('');
      let year = parseInt(date.slice(1,5).join(''));
      wine.production_year = year;
      name.pop();
      name = name.join(' ');
      wine.grape_type = 'N/A';
      wine.color = 'N/A';
      whites.forEach(white => { 
        if(wine.name.includes(white)){ 
          wine.color = 'white';
          if(white === 'Grigio') white = 'Pinot '+white;
          if(white === 'Gris') white = 'Pinot '+white;
          wine.grape_type = white; 
        }
      });
      reds.forEach(red => { 
        if(wine.name.includes(red)){ 
          wine.color = 'red'; 
          if(red === 'Noir') red = 'Pinot '+red;
          wine.grape_type = red; 
        } 
      });

    
      wine.name = name;
      return wine;
    })

    vineyard.wines = cleanWines;
    return { ...vineyard, location: 'somewhere', harvest: true };
  })
  writeFile('cleanVineyards.json', JSON.stringify(cleanData, null, 2),function(err) {
    if(err) console.log('nah,', error);
  })
} 

cleaner(vineyardData)