const { test } = require('../../controller/server_test/test');
const express = require('express');
const router = express.Router();

router.get('/', test);

module.exports = router;