const express = require('express');
const router = express.Router();
const request = require('./requests');

router.get('/api/v1/vineyards', request.getAllVineyards);
router.get('/api/v1/wines', request.getAllWines);

router.get('/api/v1/:vineyard_id', request.getVineyard);
router.post('/api/v1/vineyards', request.addVineyard);
router.put('/api/v1/:vineyard_id', request.updateVineyard);
router.delete('/api/v1/:vineyard_id', request.deleteVineyard);

// router.get('/api/v1/:wine_id', request.getWine);
// router.post('/api/v1/:vineyard_id/wines', request.addWine);
// router.put('/api/v1/:wine_id', request.updateWine);
// router.delete('/api/v1/:wine_id', request.deleteWine);

module.exports = router;
