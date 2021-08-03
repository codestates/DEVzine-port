const { test } = require('../controller/test');
const express = require('express');
const router = express.Router();

router.get('/', test);

module.exports = router;