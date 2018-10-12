const vineyardData = require('../../../cleanVineyards.json');

const createVineyard = (knex, vineyard) => {
  return knex('vineyards')
    .insert(
      {
        name: vineyard.name,
        location: vineyard.location,
        date_established: vineyard.date_established,
        harvest: vineyard.harvest
      },
      'id'
    )
    .then(vineyardId => {
      let winePromises = [];
      vineyard.wines.forEach(wine => {
        winePromises.push(
          createWine(knex, {
            name: wine.name,
            grape_type: wine.grape_type,
            color: wine.color,
            production_year: wine.production_year,
            price: wine.price,
            score: wine.score,
            vineyard_id: vineyardId[0]
          })
        );
      });
      return Promise.all(winePromises);
    });
};

const createWine = (knex, wine) => {
  return knex('wines').insert(wine);
};

exports.seed = function(knex, Promise) {
  return knex('wines')
    .del()
    .then(() => knex('vineyards').del())
    .then(() => {
      let vineyardPromises = [];
      vineyardData.forEach(vineyard => {
        vineyardPromises.push(createVineyard(knex, vineyard));
      });
      return Promise.all(vineyardPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
