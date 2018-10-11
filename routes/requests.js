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

const getVineyard = (request, response) => {
  const { vineyard_id } = request.params;
  database('vineyards')
    .where('id', vineyard_id)
    .select()
    .then(vineyard => {
      if (vineyard.length) {
        response.status(200).json({
          status: 'ok',
          data: vineyard,
          message: 'Here is your vineyard!'
        });
      } else {
        response.status(404).json({
          status: 'failed',
          message: 'Unable to find vineyard.'
        });
      }
    })
    .catch(error => response.status(500).json({ error }));
};

const addVineyard = (request, response) => {
  const vineyard = request.body;
  for (let required of ['name', 'location', 'date_established']) {
    if (!vineyard[required]) {
      return response.status(422).send({
        error: `You are missing "${required}" parameter.`
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
        return response.status(400).send({ error: 'Vineyard already exists.' });
      }
    })
    .catch(error => response.status(500).json({ error }));
};

const updateVineyard = (request, response) => {
  const vineyardUpdate = request.body;
  const { vineyard_id } = request.params;

  database('vineyards')
    .where('id', vineyard_id)
    .update(vineyardUpdate)
    .returning('*')
    .then(vineyard =>
      response.status(200).json({
        status: 'ok',
        data: vineyard
      })
    )
    .catch(error =>
      response.status(400).json({
        status: 'failed',
        error
      })
    );
};

const deleteVineyard = (request, response) => {
  const { vineyard_id } = request.params;
  database('vineyards')
    .where('id', vineyard_id)
    .select()
    .then(vineyard => {
      if (!vineyard.length) {
        return response.status(404).json({ error: 'Could not find Vineyard.' });
      } else {
        database('wines')
          .where('vineyard_id', vineyard_id)
          .del()
          .then(results => {
            database('vineyards')
              .where('id', vineyard_id)
              .del()
              .then(result => {
                if (!result) {
                  response
                    .status(404)
                    .json({ message: 'Could not find Vineyard.', error });
                } else {
                  response
                    .status(200)
                    .json({ message: 'Successful deletion of Vineyard.' });
                }
              })
              .catch(error => response.status(500).json({ error }));
          })
          .catch(error => response.status(500).json({ error }));
      }
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

const getWine = (request, response) => {
  const { wine_id } = request.params;
  database('wines')
    .where('id', wine_id)
    .select()
    .then(wine => {
      if (wine.length) {
        return response.status(200).json({
          status: 'ok',
          data: wine,
          message: 'Is this wine good?'
        });
      } else {
        return response.status(404).json({
          status: 'failed',
          message: 'We failed to find that vintage'
        });
      }
    })
    .catch(error => response.status(500).json({ error }));
};

const addWine = (request, response) => {
  const wine = request.body;
  const { vineyard_id } = request.params;
  for (let required of [
    'name',
    'grape_type',
    'color',
    'production_year',
    'price'
  ]) {
    if (!wine[required]) {
      return response.status(422).send({
        error: `You are missing "${required}" parameter`
      });
    }
  }
  database('wines')
    .where('name', wine.name)
    .select()
    .then(existingWine => {
      if (!existingWine.length) {
        database('wines')
          .insert({ ...wine, vineyard_id: parseInt(vineyard_id) }, 'id')
          .then(vino => {
            response.status(201).json({
              id: vino[0]
            });
          })
          .catch(error => response.status(500).json({ error }));
      } else {
        return response.status(400).send({ error: 'Wine already exists' });
      }
    })
    .catch(error => response.status(500).json({ error }));
};

const updateWine = (request, response) => {
  const wineUpdate = request.body;
  const { wine_id } = request.params;
  if (wineUpdate) {
    database('wines')
      .where('id', wine_id)
      .update(wineUpdate)
      .returning('*')
      .then(wine => {
        response.status(200).json(wine);
      })
      .catch(error => {
        return response.status(422).json({
          message:
            'You do not have the correct information to complete this request',
          error
        });
      });
  }
};

const deleteWine = (request, response) => {
  const { wine_id } = request.params;
  database('wines')
    .where('id', wine_id)
    .select()
    .then(wine => {
      if (!wine.length) {
        return response
          .status(404)
          .json({ error: 'Could not find Vitis Vinifera.' });
      } else {
        database('wines')
          .where('id', wine_id)
          .del()
          .then(result => {
            response
              .status(200)
              .json({ message: 'Successful deletion of Wine' });
          });
      }
    })
    .catch(error =>
      response.status(500).json({ message: 'Could not find Wine', error })
    );
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
