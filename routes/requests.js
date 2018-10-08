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

const getVineyard = (request, response) => {
  database('vineyards')
    .where('id', request.params.vineyard_id)
    .select()
    .then(vineyard => {
      if (vineyard.length) {
        response.status(200).json({
          status: 'ok',
          data: vineyard,
          message: 'Here is your vineyard'
        });
      } else {
        response.status(404).json({
          status: 'failed',
          message: 'Unable to find vineyard'
        });
      }
    })
    .catch(error => response.status(500).json({ error }));
};

const addVineyard = (request, response) => {
  const vineyard = request.body;
  for (let required of ['name', 'location', 'date_established', 'harvest']) {
    if (!vineyard[required]) {
      return response.status(422).send({
        error: `You are missing "${required}" parameter`
      });
    }
  }
  database('vineyards')
    .where('name', vineyard.name)
    .select()
    .then(existingVineyard => {
      if (!existingVineyard.length) {
        database('vineyards')
          .insert(vineyard, 'id')
          .then(yard => {
            response.status(201).json({ id: yard[0] });
          })
          .catch(error => response.status(500).json({ error }));
      } else {
        return response.status(400).send({ error: 'Vineyard already exists' });
      }
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
