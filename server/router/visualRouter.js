const { getStatisticsForVisual } = require('../controller/visual');
const express = require('express');
const router = express.Router();

router.get('/', getStatisticsForVisual);

module.exports = router;