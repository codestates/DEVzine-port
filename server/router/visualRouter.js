const { getStatisticsForVisual } = require('../controller/visual');
const { checkCacheForVisuals } = require('../controller/middleware/isCached');
const express = require('express');
const router = express.Router();

router.get('/', checkCacheForVisuals, getStatisticsForVisual);

module.exports = router;
