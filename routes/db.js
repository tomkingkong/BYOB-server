const express = require('express');
const router = express.Router();
const request = require('./requests');

router.get('/vineyards', request.getAllVineyards);
router.get('/wines', request.getAllWines);

router.get('/vineyards/:vineyard_id', request.getVineyard);
router.post('/vineyards', request.addVineyard);
router.put('/vineyards/:vineyard_id', request.updateVineyard);
router.delete('/vineyards/:vineyard_id', request.deleteVineyard);

router.get('/wines/:wine_id', request.getWine);
router.post('/:vineyard_id/wines', request.addWine);
router.put('/wines/:wine_id', request.updateWine);
router.delete('/wines/:wine_id', request.deleteWine);

module.exports = router;
