exports.seed = function(knex, Promise) {
  // Deletes all entries
  return knex('wines')
    .del()
    .then(() => knex('vineyards').del())
    .then(() => {
      return Promise.all([
        knex('vineyards')
          .insert(
            {
              name: `LyonsKing Vineyards`,
              location: `Denver, CO`,
              date_established: 2018,
              harvest: true
            },
            'id'
          )
          .then(vineyard => {
            return knex('wines')
              .insert([
                {
                  name: `Tom's Juice`,
                  grape_type: `merlot`,
                  color: `red`,
                  production_year: 2018,
                  score: 95,
                  price: `$44.99`,
                  vineyard_id: vineyard[0]
                },
                {
                  name: `Mike's Juice`,
                  grape_type: `pinot noir`,
                  color: `red`,
                  production_year: 2017,
                  score: 96,
                  price: `$945.99`,
                  vineyard_id: vineyard[0]
                }
              ])
              .then(() => console.log(`Seeding complete!`))
              .catch(error => console.log(`Error seeding data: ${error}`));
          })
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
