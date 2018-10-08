const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const getAllVineyards = (request, response) => {
  database('vineyards')
    .select()
    .then(vineyards => {
      response.status(200).json({
        status: 'ok',
        data: vineyards,
        message: 'Enjoy your vineyards!'
      });
    })
    .catch(error => response.status(500).json({ error }));
};

const getAllWines = (request, response) => {
  database('wines')
    .select()
    .then(wines => {
      response.status(200).json({
        status: 'ok',
        data: wines,
        message: 'Enjoy your vitis vinifera!'
      });
    })
    .catch(error => response.status(500).json({ error }));
};

module.exports = {
  getAllVineyards,
  getAllWines,
  getVineyard,
  addVineyard,
  updateVineyard,
  deleteVineyard,
  getWine,
  addWine,
  updateWine,
  deleteWine
};
