const express = require('express');
const router = express.Router();
const instrumentsController = require('../controllers/instruments');

router
  .route('/instruments')
  .get(instrumentsController.getInstruments);

module.exports = router;
