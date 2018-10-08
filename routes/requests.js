const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[enviroment];
const database = require('knex')(configuration);

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
